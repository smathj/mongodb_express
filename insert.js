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
  console.log('[System-Insert] 최초 실행 함수 실행');

  await client.connect(); // 몽고디비 클라이언트 연결
  console.log('[System-Insert] 몽고디비에 연결완료');
  const db = client.db(dbName);

  // 콜렉션(테이블) 지정
  const collection = db.collection('documents');
}

main();
