import NavBar from '../Components/Navbar';
export default function Home() {
    const para = [{
        title: "Code-Room",
        content: `Code-Room is an web application that provide seamless platform for a friendly coding competetion amoung you peers`
    },
    {
        title: "Key-features",
        content: `Great User-Interface`
    }]
    return (
        <div className=' bg-slate-300 h-screen flex flex-col gap-3' >
            <NavBar></NavBar>
            <PageComponents heading={para[0].title} body={para[0].content}></PageComponents>
            <PageComponents heading={para[1].title} body={para[1].content}></PageComponents>
        </div>
    );
}

function PageComponents({ heading, body }) {
    return (
        <>
            <PageComponentsHeading heading={heading}></PageComponentsHeading>
            <PageComponentsBody body={body}></PageComponentsBody>
        </>
    )
}
function PageComponentsHeading({ heading }) {
    return (
        <div className='text-2xl font-bold'>
            {heading}
        </div>
    )
}
function PageComponentsBody({ body }) {
    return (
        <div>
            {body}
        </div>
    )
}