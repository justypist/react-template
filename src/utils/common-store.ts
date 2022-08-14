import { debounce } from 'lodash';
import { BehaviorSubject } from 'rxjs';

type CommonStoreHash<Request> = (key: Request) => string;
type CommonStoreObserver<Response> = (response: Response | undefined) => void;

interface CommonStoreOptions<Request, Response> {
  hash?: CommonStoreHash<Request>;
  fetchData: (keys: Request[]) => Promise<Response[]>;
  initialValue?: Response;
  debounceTime?: number;
}

export class CommonStore<Request, Response> {
  private _hashKeyMap = new Map<string, Request>();
  private _hashSubjectMap = new Map<
    string,
    BehaviorSubject<Response | undefined>
  >();

  private _hashSet: Set<string> = new Set<string>();

  private _hash: CommonStoreHash<Request> = (key: Request) => String(key);
  private _fetchData: (keys: Request[]) => Promise<Response[]>;
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

  // 真实请求
  private fetchData = debounce(async () => {
    // 获取队列中所有请求key
    const keys = [...this._hashSet.values()]
      .map((hash) => this._hashKeyMap.get(hash))
      .filter<Request>(
        (key): key is Request => key !== null && key !== undefined,
      );

    this._hashSet.clear();

    const responses = await this._fetchData(keys);

    keys.forEach((key, index) => {
      const response = responses[index];
      if (!response) {
        return;
      }
      const hash = this._hash(key);
      const subject = this._hashSubjectMap.get(hash);
      if (!subject) {
        return;
      }
      subject.next(response);
    });
  }, this._debounceTime);

  // 订阅
  public subscribe(
    key: Request,
    observer: CommonStoreObserver<Response>,
    initialValue?: Response,
  ) {
    // 通过请求参数得到hash
    const hash = this._hash(key);
    // 通过key查找主题
    let subject = this._hashSubjectMap.get(hash);

    // 如果没找到主题 说明是第一次订阅
    if (!subject) {
      // 保存hash和key的映射关系
      this._hashKeyMap.set(hash, key);
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
