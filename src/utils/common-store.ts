import { debounce } from 'lodash';
import { BehaviorSubject } from 'rxjs';

type CommonStoreHash<Request> = (request: Request) => string;
type CommonStoreObserver<Response> = (response: Response | undefined) => void;

interface CommonStoreOptions<Request, Response> {
  hash?: CommonStoreHash<Request>;
  fetchData: (requests: Request[]) => Promise<Response[]>;
  initialValue?: Response;
  debounceTime?: number;
}

export class CommonStore<Request, Response> {
  private _hashRequestMap = new Map<string, Request>();
  private _hashSubjectMap = new Map<
    string,
    BehaviorSubject<Response | undefined>
  >();

  private _hashSet: Set<string> = new Set<string>();

  private _hash: CommonStoreHash<Request> = (request: Request) =>
    String(request);
  private _fetchData: (requests: Request[]) => Promise<Response[]>;
  private _initialValue?: Response;
  private _debounceTime = 100;

  constructor({
    hash,
    fetchData,
    initialValue,
    debounceTime,
  }: CommonStoreOptions<Request, Response>) {
    this._hash = hash ?? this._hash;
    this._fetchData = fetchData;
    this._initialValue = initialValue ?? this._initialValue;
    this._debounceTime = debounceTime ?? this._debounceTime;
  }

  // 合并后的请求
  private fetchData = debounce(async () => {
    // 获取队列中所有request
    const requests = [...this._hashSet.values()]
      .map((hash) => this._hashRequestMap.get(hash))
      .filter<Request>(
        (request): request is Request =>
          request !== null && request !== undefined,
      );

    // 清空请求队列
    this._hashSet.clear();

    // 调用真实请求， 请求内部需要将req和res一一对应返回
    const responses = await this._fetchData(requests);

    // 通过相应主题将response派发
    requests.forEach((request, index) => {
      const response = responses[index];
      if (!response) {
        return;
      }
      const hash = this._hash(request);
      const subject = this._hashSubjectMap.get(hash);
      if (!subject) {
        return;
      }
      subject.next(response);
    });
  }, this._debounceTime);

  // 订阅
  public subscribe(
    request: Request,
    observer: CommonStoreObserver<Response>,
    initialValue?: Response,
  ) {
    // 通过request得到hash
    const hash = this._hash(request);
    // 通过hash查找主题
    let subject = this._hashSubjectMap.get(hash);

    // 如果没找到主题 说明是第一次订阅
    if (!subject) {
      // 保存hash和request的映射关系
      this._hashRequestMap.set(hash, request);
      // 将这个hash添加到下一次的请求列表中
      this._hashSet.add(hash);

      // 生成新的主题， 添加初始值
      subject = new BehaviorSubject<Response | undefined>(
        initialValue ?? this._initialValue,
      );
      // 保存hash和主题的映射关系
      this._hashSubjectMap.set(hash, subject);
    }

    // 发出真实请求
    this.fetchData();

    // 使用传入的观察者订阅这个主题并返回订阅
    return subject.subscribe(observer);
  }
}
