require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

/**
 * 몽고디비만 사용하여 데이터 접근
 * [ 데이터 수정 ]
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
  console.log('[System-Update] 최초 실행 함수 실행');

  await client.connect(); // 몽고디비 클라이언트 연결
  console.log('[System-Update] 몽고디비에 연결완료');
  const db = client.db(dbName);

  // 콜렉션(테이블) 지정
  const collection = db.collection('documents');

  //! 1. 단건 수정
  /*
    const result = await collection.updateOne(
      { _id: ObjectId('6291bf4002e6685c8c6a71b6') },
      {
        $set: {
          // name: 'habook',
          job: '하북몬',
        },
      }
    );
    console.log(result);
*/

  //! 2. replcae 대체 하기
  /*
  const result = await collection.replaceOne(
    { _id: ObjectId('6291bf4002e6685c8c6a71b6') },
    {
      name: 'habook',
      job: '하북몬이다',
    }
  );
  console.log(result);
*/

  //! 3. 여러건 수정 updateMany
  /*
  const filter = {
    name: '테스트',
  };

  const updateDocument = {
    // ? 필드 값 자체가 객체 이고, 객체의 프로퍼티가 배열인 경우
    // * v1.
    // inner : object, bucket: array
    //   inner = {
    //       bucket: [1,2,3]
    //   }
    // $push: { 'inner.bucket': '두번째 데이터' },

    // ? 필드 값 자체가 배열 이고, 배열의 요소가 객체인 경우
    // * v2.
    // inner : array, bucket: array
    // inner = [{
    //     bucket: [1,2,3],
    //     flag: '하북'
    // }]
    $push: { 'inner.$[item].bucket': '한번에 모두업데이트?' },
  };

  const options = {
    arrayFilters: [
      {
        // 'item.name': '홍길동',
        // 'item.job': '의적',
        'item.flag': '하북', //
      },
    ],
  };

  const result = await collection.updateMany(filter, updateDocument, options);
  //   const result = await collection.updateMany(filter, updateDocument);
  console.log(result);
*/

  //! 4. upsert (업데이트하거나 없으면 생성)
  const query = { name: '킹하북' };
  const update = {
    $set: {
      name: '킹하북',
      job: '해적왕',
    },
  };
  const option = { upsert: true };

  const result = await collection.updateOne(query, update, option);
  console.log(result);

  // 연결 종료
  //   client.close();
}

main().catch((err) => console.log(err));
