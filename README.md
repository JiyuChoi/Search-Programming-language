# Search-Programming-language
<img width="535" alt="프로그래밍 언어 검색 구현 사진" src="https://user-images.githubusercontent.com/75539452/168452669-bdb6ee14-f886-4c0e-8301-9aa98372557e.png">

Vanilla JS를 이용해 프로그래밍 언어를 검색할 수 있는 서비스 구현</br>

- [Requirements](https://github.com/JiyuChoi/Search-Programming-language/issues/1)

## API 문서
- Base URL : https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev

- 프로그래밍 언어 조회
  - /languages
  - Method : GET
  - Query Parameter : keyword
  - 검색하고자 하는 키워드를 query parameter로 넘기면 조건에 맞는 데이터를 조회하여 응답

- response body
  ```jsx
  // 'java'라는 키워드로 조회
  /languages?keyword=java

  // response 결과
  [
    "Java",
    "JavaFX Script",
    "JavaScript",
    "Join Java"
  ]
  ```

## 디렉토리 구조

```
src
├─ components
│  └─ SearchInput.js
│  └─ SelectedLanguages.js
│  └─ Suggestion.js
├─ styles
│  └─ style.css
├─ utils
│  └─ api.js
│  └─ debounce.js
├─ App.js
└─ index.js
```
