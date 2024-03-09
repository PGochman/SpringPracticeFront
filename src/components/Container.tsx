import { ReactNode } from "react";

type props = {
    children?: ReactNode
}

export default function ({children} : props){
    return <section className="flex flex-col pt-24 px-32 bg-blue-100 h-screen items-center">
        {children}
    </section>
}