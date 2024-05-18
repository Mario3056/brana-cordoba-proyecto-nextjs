import CardSkeleton from "./cardSkeleton";

export default function CardsSkeleton() {
    return (
        <section className="text-gray-600 body-font">

      <div className="container px-5 py-24 mx-auto">

        <div className="flex flex-wrap -m-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </section>
    );
}