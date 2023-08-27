# 자료구조와 알고리즘 4주차 과제 - 이진 탐색 트리 기반 순차 심볼 테이블

다음은 순차 심볼 테이블의 API입니다.

| 메서드 | 설명 |
| --- | --- |
| ST() | 심볼 테이블을 생성합니다 |
| get(key): Item? | 키와 연관된 값을 반환한다. 해당하는 키가 없으면 undefined를 반환 |
| put(key, value): void | 키/값 쌍을 테이블에 넣는다. |
| delete(key): void | 키에 해당하는 키/값 쌍을 삭제한다 |
| contains(key): Boolean | 키와 연관된 값이 존재하면 true, 존재하지 않으면 false를 반환한다 |
| isEmpty(): Boolean | 심볼 테이블이 비어있으면 true, 비어있지 않으면 false를 반환한다 |
| size(): Number | 테이블에 저장된 키/값 쌍의 개수를 반환한다 |
| min(): Key? | 가장 작은 키를 반환한다 |
| max(): Key? | 가장 큰 키를 반환한다 |
| floor(Key): Key? | 키보다 작거나 같은 값 중에 가장 큰 키를 반환 |
| ceiling(Key): Key? | 주어진 키보다 크거나 같은 가장 작은 키를 반환 |
| rank(Key): Key? | 주어진 키보다 작은 키의 개수 반환 |
| select(k): Key? | k번째 순위의 키를 반환 |
| deleteMin(): void | 가장 작은 키를 삭제한다 |
| deleteMax(): void | 가장 큰 키를 삭제한다 |
| keys(): Iterable | 테이블에 저장된 모든 키 목록 배열을 반환 |
| keysRange(low, high): Iterable | [low..high] 범위에 속하는 키 목록 배열 반환 |

위 API를 참고하여 아래 기능들을 구현해 주세요. `rank()`를 활용해서 구현해야 합니다.

* contains
* floor
* ceiling
* keysRange
