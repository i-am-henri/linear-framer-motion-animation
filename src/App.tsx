import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";
import { PlusIcon } from "./Icons/PlusIcon";
import { CrossIcon } from "./Icons/CrossIcon";
import { OFFERINGS } from "./content";
import { Offering } from "./types";
import "./styles.css";

export default function App() {
  return <Linear />;
}

export function Linear() {
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(
    null
  );

  return (
    <>
      <main className="size-full bg-[#131416] p-6 md:p-12 overflow-y-auto">
        <ul className="flex flex-wrap gap-4 justify-center items-center size-full">
          {OFFERINGS.map((offering) => (
            <Card
              key={offering.id}
              offering={offering}
              onClick={() => setSelectedOffering(offering)}
            />
          ))}
        </ul>
      </main>
      <Modal
        offering={selectedOffering}
        onClick={() => setSelectedOffering(null)}
      />
      <TailwindCDNWorkaround />
    </>
  );
}

function Card(props: { offering: Offering; onClick: () => void }) {
  return (
    <motion.li
      key={props.offering.title}
      className="text-white h-[360px] aspect-[336/360] py-8 px-7 rounded-[30px] bg-[#080A0A] text-[21px] hover:brightness-125 flex justify-end flex-col text-balance cursor-pointer"
      layoutId={`offeringContainer${props.offering.id}`}
      onClick={props.onClick}
    >
      <motion.img
        src={props.offering.banner}
        alt="Banner"
        layoutId={`offeringBanner${props.offering.id}`}
      />
      <div className="flex justify-between items-center">
        <motion.p
          className="text-balance"
          layoutId={`offeringHeading${props.offering.id}`}
        >
          {props.offering.title}
        </motion.p>
        <Button>
          <PlusIcon className="size-4" />
        </Button>
      </div>
      <motion.span layoutId={`offeringDescription${props.offering.id}`} />
    </motion.li>
  );
}

function Modal(props: { offering: Offering | null; onClick: () => void }) {
  return (
    <>
      <AnimatePresence>
        {!!props.offering && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-10"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(32px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!props.offering && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-end"
            onClick={props.onClick}
          >
            <motion.div
              className="p-8 max-w-[960px] mx-auto h-[96vh] rounded-t-[30px] relative overflow-y-auto bg-[#090A0B]"
              layoutId={`offeringContainer${props.offering.id}`}
            >
              <motion.img
                src={props.offering.banner}
                alt="Banner"
                className="-mt-8"
                layoutId={`offeringBanner${props.offering.id}`}
              />
              <div className="max-w-xl mx-auto -mt-20 md:-mt-60">
                <motion.p
                  className="text-white text-[56px] font-medium text-balance leading-[60px]"
                  layoutId={`offeringHeading${props.offering.id}`}
                >
                  {props.offering.title}
                </motion.p>
                <motion.p
                  className="text-[#969799] font-medium text-[15px] mt-8"
                  layoutId={`offeringDescription${props.offering.id}`}
                >
                  {props.offering.description}
                </motion.p>
              </div>
              <Button className="absolute top-8 right-8">
                <CrossIcon className="size-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/*
NOTE: Only required to work with Tailwind CDN.
Include all conditionally rendered classes in a hidden div
to ensure Tailwind generates these classes in advance.
*/
function TailwindCDNWorkaround() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 flex flex-col justify-end p-8 max-w-[960px] mx-auto h-[96vh] rounded-t-[30px] relative overflow-y-auto bg-[#090A0B] max-w-xl mx-auto -mt-20 md:-mt-60 -mt-8 text-white text-[56px] font-medium text-balance leading-[60px] text-[#969799] font-medium text-[15px] mt-8 absolute top-8 right-8 size-5 hidden" />
  );
}
