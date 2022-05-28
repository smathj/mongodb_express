require('dotenv').config();
const { MongoClient } = require('mongodb');

/**
 * 몽고디비만 사용하여 데이터 접근
 * [ 데이터 추가 ]
 */

// or as an es module:
// import { MongoClient } from 'mongodb'

// DB URL
const client = new MongoClient(process.env.DB_URL);

// 데이터 베이스
const dbName = process.env.DB_DATABASE;

// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

//  최초 실행 함수
async function main() {
  console.log('[System-Delete] 최초 실행 함수 실행');

  await client.connect(); // 몽고디비 클라이언트 연결
  console.log('[System-Delete] 몽고디비에 연결완료');
  const db = client.db(dbName);

  // 콜렉션(테이블) 지정
  const collection = db.collection('documents');

  //! 단건 삭제
  /*
  // 비교연산자로 다양한 범위 $gt, $lt ... 특정할 수 있다
  const target = {
    name: '홍길동',
  };

  const result = await collection.deleteOne(target);
  console.log(result); // { acknowledged: true, deletedCount: 1 }
  */

  //! 여러건 삭제
  // 정규표현식으로 여러건 삭제
  const target = {
    name: /홍길동/,
  };

  const result = await collection.deleteMany(target);
  console.log(result); // { acknowledged: true, deletedCount: 10 }

  client.close();
}

main();
