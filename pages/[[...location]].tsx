import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getMenuItems } from "../utils/api/items";
import { MenuItem } from "../utils/types/Menu";
import Image from "next/image";
import titleBackground from "../public/title-background.png";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const location = Number(context.params?.location);
  const items = await getMenuItems();

  return { props: { items, location } };
};

interface ItemGroup {
  category: string;
  order: number;
  items: MenuItem[];
}

const Home = ({ items, location }: { items: MenuItem[]; location: number }) => {
  const [itemGroups, setItemGroups] = useState<ItemGroup[]>([]);

  useEffect(() => {
    const itemGroups: ItemGroup[] = [];
    items.forEach((item) => {
      const category = item.category;
      const existingGroup = itemGroups.find(
        (itemGroup) => itemGroup.category === item.category.name
      );
      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        const newGroup = {
          category: category.name,
          order: category.order,
          items: [item],
        };
        itemGroups.push(newGroup);
      }
    });
    itemGroups.sort((a, b) => (a.order > b.order ? 1 : -1));
    setItemGroups(itemGroups);
  }, [items]);

  return (
    <div>
      <Head>
        <title>{`Da Vinci Menu`}</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="w-full h-full flex flex-col bg-[#FBEEE2]">
        <div className="flex w-full h-16">
          <div className="relative w-full">
            <Image
              className=""
              src={titleBackground}
              alt="background"
              layout="fill"
            />
            <Image
              className=""
              src={titleBackground}
              alt="background"
              layout="fill"
            />
            <div className="text-light-brown text-2xl h-full relative font-germania">
              <div className="flex justify-center items-center h-full">
                Da Vinci Board Game Cafe - Menu
              </div>
            </div>
          </div>
        </div>
        {itemGroups.map((itemGroup) => (
          <div
            key={itemGroup.category}
            className="flex justify-between text-light-brown text-center"
          >
            <div className="flex flex-col mt-5 lg:mt-10 mx-2 lg:mx-20 w-full overflow-y-auto">
              <div className="text-lg font-bold lg:text-2xl bg-dark-brown font-merriweather">
                <h1>{itemGroup.category}</h1>
              </div>
              <div className="flex flex-col text-lg font-merriweather text-black">
                {itemGroup.items.map((item) => (
                  <div key={item._id} className="flex">
                    <h2
                      className={`py-2 border-dark-brown border-b-2 w-full ${
                        location ? "text-start" : "text-center"
                      } px-4`}
                    >
                      {item.name}
                    </h2>
                    {location === 1 && (
                      <h2 className="py-2 border-dark-brown border-b-2 w-full text-end px-4">
                        {item.priceBahceli}
                      </h2>
                    )}
                    {location === 2 && (
                      <h2 className="py-2 border-dark-brown border-b-2 w-full text-end px-4">
                        {item.priceNeorama}
                      </h2>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
