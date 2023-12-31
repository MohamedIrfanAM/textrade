import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {username} = await req.json()

        const userInfo = await prismadb.users.findUnique({
            where: {
              username: username,
            },
            select: {
              name: true,
              email: true,
              note: true,
              profile_pic : true,
              location: true,
              passoutyear: true,
              phoneNo: true,
              branch:{
                select:{
                  name:true
                }
              },
              college:{
                select:{
                  name:true
                }
              },
            },
          });          
        return new NextResponse(JSON.stringify(userInfo), { status: 200 })
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 })
    }
}