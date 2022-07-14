import { BehaviorSubject } from 'rxjs';
import { debounce } from 'lodash';

type CommonStoreHash<K> = (key: K) => string;
type CommonStoreObserver<R> = (response: R | undefined) => void;

interface CommonStoreOptions<K, R> {
  hash?: CommonStoreHash<K>;
  debounceTime?: number;
  fetchData: (keys: K[]) => Promise<R[]>;
}

export class CommonStore<K, R> {
  private _hashKeyMap = new Map<string, K>();
  private _hashSubjectMap = new Map<string, BehaviorSubject<R | undefined>>();

  private _hashSet: Set<string> = new Set<string>();

  private _hash: CommonStoreHash<K> = (key: K) => String(key);
  private _debounceTime = 100;
  private _fetchData: (keys: K[]) => Promise<R[]>;

  constructor({ hash, debounceTime, fetchData }: CommonStoreOptions<K, R>) {
    this._hash = hash ?? this._hash;
    this._debounceTime = debounceTime ?? this._debounceTime;
    this._fetchData = fetchData;
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

  public subscribe(key: K, observer: CommonStoreObserver<R>, initialValue?: R) {
    const hash = this._hash(key);
    // 判断是否已经存在
    let subject = this._hashSubjectMap.get(hash);
    if (!subject) {
      this._hashKeyMap.set(hash, key);
      this._hashSet.add(hash);

      subject = new BehaviorSubject<R | undefined>(initialValue);
      this._hashSubjectMap.set(hash, subject);
    }

    this.fetchData();
    return subject.subscribe(observer);
  }
}
