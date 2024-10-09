import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import { taskSchema } from "../../../../components/(dashboard-page)/(table)/data/schema";
import { DataTable } from "@/components/(dashboard-page)/(table)/components/data-table";
import { DirectTeamLoader } from "@/components/direct-team-loader";
import { columns } from "@/components/(dashboard-page)/(table)/components/columns";
import { UserNav } from "@/components/(dashboard-page)/(table)/components/user.nav";




async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/(dashboard-page)/(table)/data/tasks.json")
  )

  console.log("data",data)

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}




export default async function DirectTeamPage() {
  const tasks = await getTasks()

  return (
     <div className="w-screen lg:w-full h-full flex items-center justify-center">
       <div className=" h-full w-[90%]  lg:max-w-6xl flex-1 flex-col space-y-8 p-8 md:flex border m-10 rounded-xl">
    <div className="flex items-center justify-between space-y-2">
      <div className="w-full  flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold tracking-tight  flex items-center justify-center">Direct Team</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your direct team!
        </p>
      </div>
      <div className="flex items-center space-x-2">
      </div>
    </div>
    <DataTable data={tasks} columns={columns} />

  </div>
     </div>


  )
}
