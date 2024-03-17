import Image from "next/image";

import { Picture } from "@/types";
import CardActions from "@/components/card-actions";

type PictureCardProps = {
  picture: Picture;
};

export default function PictureCard({ picture }: PictureCardProps) {
  return (
    <div className="card card-compact w-full h-full bg-base-100 shadow-xl">
      <Image
        src={picture.url || picture.thumbnailUrl}
        alt={picture.title}
        height={250}
        width={300}
        className="object-cover w-full h-[300px]"
      />
      <div className="card-body flex flex-col justify-between items-center">
        <h2 className="card-title capitalize">{picture.title}</h2>
        <CardActions picture={picture} />
      </div>
    </div>
  );
}

export const PictureCardSkeleton = () => {
  return (
    <div className="card h-full w-full">
      <div className="skeleton w-full h-[300px]" />
      <div className="card-body flex flex-col justify-between items-center">
        <h2 className="card-title skeleton h-8 w-full" />
        <div className="w-full flex justify-between items-center">
          <div className="h-6 w-12 skeleton rounded-xl" />
          <div className="h-6 w-12 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  );
};
