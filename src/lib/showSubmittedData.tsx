import { toast } from "sonner";

export function showSubmittedData(
  data: unknown,
  title: string = 'You submitted the following values:'
) {
  toast(title, {
    // w-[340px]
    description: (
      <pre className="rounded-md mt-2 font-mono bg-muted w-[330px] p-4">
        <code className='text-muted-foreground'>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}