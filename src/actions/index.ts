'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {id},
        data: {code}
    });

    redirect(`/snippets/${id}`)
}

// delete the snippet
export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {id}
    })
    redirect('/');
};


export async function createSnippet(formState: { message: string },  formData: FormData) {
    // console.log(formData)
    // return {
    //     message: "Title must be longer!!"
    // };
    // This needs to be a server action
    // 'use server';
    
    // check the user's inputs and make sure they are  valid
    // const title = formData.get('title') as string;
    try {
        const title = formData.get('title');
        const code = formData.get('code');

        console.log(377, title, code);

        if(typeof title !== 'string' || title.length < 3) {
            return {
                
                message: 'Title must be longer'
            }
        }
        if(typeof code !== 'string' || code.length < 10) {
            return {
                message: 'Code must be longer'
            }
        }


        // throw new Error('Failed to save to database')
        // create a new record in the database
        await db.snippet.create({
            data: {
                title, 
                code
            }
        });

    } catch(err: unknown) {
        if(err instanceof Error) {
            return {
                message: err.message
            };
        } else {
            return {
                message : 'Something went wrong!'
            }
        }
    }
    redirect('/');
}