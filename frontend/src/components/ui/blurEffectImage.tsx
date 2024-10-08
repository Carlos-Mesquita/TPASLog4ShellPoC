import React from 'react';
import Image from 'next/image';
import RingLoader from "react-spinners/RingLoader";

const BlurEffectImage: React.FC<{ src: string; alt: string; width?: number, height?: number }> = ({ src, alt, width = 150, height = 150 }) => {
    const [isLoading, setLoading] = React.useState(true);

    return (
        <>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <RingLoader color='#000000' size={50} />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`max-w-full max-h-full w-auto h-auto object-contain duration-700 ease-in-out ${isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                    }`}
                onLoad={() => setLoading(false)}
            />
        </>
    );
};

export default BlurEffectImage;