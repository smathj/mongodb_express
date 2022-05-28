/**
 * 몽고디비만 사용하여 데이터 접근
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const client = new MongoClient(process.env.DB_URL);

// Database Name (데이터 베이스 지정)
const dbName = process.env.DB_DATABASE;

// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

//  최초 실행 함수
async function main() {
  console.log('[System-Select] 최초 실행 함수 실행');

  await client.connect(); // 몽고디비 클라이언트 연결
  console.log('[System-Select] 몽고디비에 연결완료');
  const db = client.db(dbName);

  // 콜렉션(테이블) 지정
  const collection = db.collection('documents');

  // 인덱스 추가
  // await collection.createIndex({ name: 1, job: 1 });
  // await collection.createIndex({ name: 'text', job: 'text' });

  // 데이터 조회
  //? 1. 단일 조회
  // const allData = await collection.findOne({ name: 'habook' });

  //? 2. 공식문서 방법
  // name $regex로 문자열 검색
  // project로 원하는 필드(칼럼)을 지정할 수 도 있다
  //   const allData = collection
  //     .find({
  //       name: { $regex: 'book', $options: 'i' },
  //     })
  //     .project({
  //       _id: 0,
  //       name: 1,
  //       job: 1,
  //     });

  //? 3. 정규 표현식 방법
  const allData = collection.find({ name: /book/ });

  // !  List 형태로 기대된다면, 다음과 같이 두가지 방법으로 데이터를 확인할 수 있다

  console.log('----------------------------------------');
  // 첫번째 방법 forEach
  allData.forEach((obj) => {
    console.log(obj);
  });

  // 두번째 방법 while (hasNext,next)
  //   while (await allData.hasNext()) {
  //     console.log(await allData.next());
  //   }
  console.log('----------------------------------------');

  //   return 'done.';
  //   return allData;
  //   client.close();
}

main();
//   .then(console.log)
//   .catch(console.error)
// .finally(() => client.close());
