import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from '@/components/snippet-edit-form';

interface SnippetEditPageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {

    const { id}  = await props.params;

    const snippetId =  parseInt(id);

    const snippet =  await db.snippet.findFirst({
        where: {
            id: snippetId
        }
    })


    if(!snippet) {
        return notFound();
    }

    return (
        // <div>
        //     <div>
        //         <h1 className="text-xl font-bold">{snippet?.title}</h1>
        //     </div>
        //     {/* <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        //         <code>
        //             {snippet?.code}
        //         </code>
        //     </pre> */}
        // </div>
        <div>
            <SnippetEditForm snippet={snippet}/>
        </div>
    )
}


