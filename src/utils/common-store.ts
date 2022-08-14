import { debounce } from 'lodash';
import { BehaviorSubject } from 'rxjs';

type CommonStoreHash<K> = (key: K) => string;
type CommonStoreObserver<R> = (response: R | undefined) => void;

interface CommonStoreOptions<K, R> {
  hash?: CommonStoreHash<K>;
  fetchData: (keys: K[]) => Promise<R[]>;
  initialValue?: R;
  debounceTime?: number;
}

export class CommonStore<K, R> {
  private _hashKeyMap = new Map<string, K>();
  private _hashSubjectMap = new Map<string, BehaviorSubject<R | undefined>>();

  private _hashSet: Set<string> = new Set<string>();

  private _hash: CommonStoreHash<K> = (key: K) => String(key);
  private _fetchData: (keys: K[]) => Promise<R[]>;
  private _initialValue?: R;
  private _debounceTime = 100;

  constructor({
    hash,
    fetchData,
    initialValue,
    debounceTime,
  }: CommonStoreOptions<K, R>) {
    this._hash = hash ?? this._hash;
    this._fetchData = fetchData;
    this._initialValue = initialValue ?? this._initialValue;
    this._debounceTime = debounceTime ?? this._debounceTime;
  }

  private fetchData = debounce(async () => {
    const keys = [...this._hashSet.values()]
      .map((hash) => this._hashKeyMap.get(hash))
      .filter<K>((key): key is K => key !== null && key !== undefined);

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
  public subscribe(key: K, observer: CommonStoreObserver<R>, initialValue?: R) {
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
      subject = new BehaviorSubject<R | undefined>(
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
