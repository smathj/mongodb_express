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
  console.log('[System-Insert] 최초 실행 함수 실행');

  await client.connect(); // 몽고디비 클라이언트 연결
  console.log('[System-Insert] 몽고디비에 연결완료');
  const db = client.db(dbName);

  // 콜렉션(테이블) 지정
  const collection = db.collection('documents');

  //? 1. 단건 추가
  //   await collection.insertOne({
  //     name: '서하북',
  //     job: '보안담당자',
  //   });

  //? 2. 여러건 추가
  const insertArr = [];
  for (let i = 1; i < 11; i++) {
    const obj = {
      name: `홍길동${i}`,
      job: `의적`,
    };
    insertArr.push(obj);
  }

  //   console.log(insertArr);
  const result = await collection.insertMany(insertArr);
  //   console.log(result);
}

main();
