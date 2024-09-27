const Page = ({ searchParams }: { searchParams: { id: string } }) => {
    return (
        <div>
            {JSON.stringify(searchParams)}
        </div>
    )
}

export default Page;