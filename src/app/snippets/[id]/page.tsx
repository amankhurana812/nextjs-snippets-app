import { db } from "@/db"
import { notFound } from "next/navigation";
import Link from "next/link";
import * as actions from '@/actions'

interface SnippetShowPageProps {
    params: Promise<{
            id: string;
        }>;
        
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    // console.log(props)
    // await new Promise((r) => setTimeout(r, 2000))
    const { id } = await props.params;


    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(id)
        }
    });

    const deleteSnippet = actions.deleteSnippet.bind(null, parseInt(id));
    if(!snippet) {
        return notFound();
    }

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title} </h1>
                <div className="flex gap-2">
                    <Link href={`/snippets/${id}/edit`} className="p-2 border rounded">Edit</Link>
                    <form action={deleteSnippet}>
                        <button type="submit" className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
                <code >
                    {snippet.code}
                </code>
            </pre>
            
        </div>
    )
}