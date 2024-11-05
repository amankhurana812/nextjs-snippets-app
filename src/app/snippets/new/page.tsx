'use client'
// import { db } from '@/db';
// import { redirect } from 'next/navigation';
import { useActionState } from "react"
import * as actions from '@/actions';

export default function SnippetCreatePage() {

    const [formState, action] = useActionState(actions.createSnippet, { message: "" })
    // we need to change this to client component in order to show the validation
    /**
     * 
     * @param formData 
     * 
            async function createSnippet(formData: FormData) {
                // This needs to be a server action
                'use server';
                
                // check the user's inputs and make sure they are  valid
                const title = formData.get('title') as string;
                const code = formData.get('code') as string;

                // create a new record in the database
                await db.snippet.create({
                    data: {
                        title, 
                        code
                    }
                });

                // console.log(22, snippet)

                //redirect
                redirect('/');
            }
     */
    
    return (
        <form action={action}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">Title</label>
                    <input type="text" name="title" className="border rounded p-2 w-full" />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code</label>
                    <textarea  name="code" className="border rounded p-2 w-full" />
                </div>

                {
                    formState.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div> :  null
                }
                {/* <div>
                    {formState.message}
                </div> */}

                <button type="submit" className="border rounded p-2 bg-blue-200">Create</button>
            </div>
        </form>
        /**
         * 
        <form action={createSnippet}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">Title</label>
                    <input type="text" name="title" className="border rounded p-2 w-full" />
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code</label>
                    <textarea  name="code" className="border rounded p-2 w-full" />
                </div>

                <button type="submit" className="border rounded p-2 bg-blue-200">Create</button>
            </div>
        </form>
         */
    )
}