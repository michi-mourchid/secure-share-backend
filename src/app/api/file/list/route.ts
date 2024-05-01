import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/fileModel";




export async function GET(request: NextRequest){
    const search = request.nextUrl.searchParams.get('name');

    const userId = await getDataFromToken(request);

    if(userId==null){
        return NextResponse.json({error: 'Erreur lors de la vérification du token '}, {status: 400});
    }

    const filesRetrieved = await File.find({});
    var resp = new NextResponse(); 
    resp.headers.set('Content-Type', '');

    if (filesRetrieved){
        return NextResponse.json(filesRetrieved);
    }


}