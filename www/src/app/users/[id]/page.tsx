import TitleGallery from "@/components/titleGallery";

export default async function UserOverview({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ name: string }>;
}) {
    const { id } = await params;
    const { name } = await searchParams;

    return (
        <>
            <h1 className="text-2xl mb-10">{name}'s titles</h1>
            <TitleGallery user={id} />
        </>
    );
}
