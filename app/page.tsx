"use client";
import { Back } from "@/components/ui/back";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import QrCode from "qrcode";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BeatLoader } from "react-spinners"; 

const formSchema = z.object({
  url: z.string().url(),
});

const SIZE: number = 200;

export default function Home() {
  const imageRef = useRef(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true); 
    setQrCodeData(null); 

    setTimeout(async () => {
      if (values.url) {
        const { url } = values;
        const qrCodeDataUrl = await QrCode.toDataURL(url, {
          width: SIZE,
        });
        setQrCodeData(qrCodeDataUrl);
      }
      setLoading(false); 
    }, 1000); 
  };

  return (
    <main className="relative flex justify-center items-center flex-col p-6 sm:p-12 lg:p-24 z-10">
      <Back /> 

      <p className="text-3xl sm:text-5xl font-extrabold text-slate-300 z-20">
        CodeScan
      </p>

     
      <div
        className={`mt-6 w-full max-w-xl bg-zinc-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-4 transition-all duration-300 custom-border ${
          qrCodeData ? "h-auto" : "h-[14rem]"
        } z-20`}
      >
        <div className="flex gap-1">
          <div className="">
            <span className="bg-red-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
          </div>
          <div className="circle">
            <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
          </div>
        </div>
        <div className="card__content"></div>
        <p className="text-zinc-300 text-md sm:text-lg text-center p-2">
          Transform Information into Scannable Magic
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col md:flex-row gap-4 items-center"
          >
            <FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full md:w-auto flex-grow">
                  <Input
                    required
                    {...field}
                    placeholder="Enter the URL"
                    type="url"
                    className="text-base text-zinc-200 outline-none p-6 sm:p-6 w-full bg-zinc-900 rounded-lg border border-zinc-900"
                  />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="gradient"
              className="h-12 flex w-full md:w-[8rem] text-white justify-center items-center bg-gradient-to-br from-[#2980B9] via-[#6DD5FA] to-[#92b4bf] px-4 py-2 rounded-lg ease-linear duration-100 hover:brightness-90 active:scale-95 text-lg font-semibold"
            >
              {loading ? <BeatLoader color="#ffffff" size={10} /> : "Generate QR"}
            </Button>
          </form>
        </Form>

        {qrCodeData && (
          //QRcode
          <div className="flex flex-col items-center mt-6">
            <Image
              ref={imageRef}
              src={qrCodeData}
              alt="Generated QR Code"
              width={SIZE}
              height={SIZE}
              className="bg-white p-2 rounded-lg"
            />
            <a
              download
              href={qrCodeData}
              className="buttonDownload justify-center items-center bg-gradient-to-br from-[#2980B9] via-[#6DD5FA] to-[#92afb7] ease-linear duration-100 hover:brightness-90 active:scale-95 text-lg font-semibold px-4 py-3 rounded text-white mt-4"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
