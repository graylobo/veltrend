import { PrismaClient } from "@prisma/client";

// schema.prisma 파일에서 설정한 데이터베이스 연결정보 (provider,url)로 연결을 해준다
const db = new PrismaClient()

export default db

