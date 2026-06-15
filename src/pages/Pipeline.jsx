import { useState } from "react";
import { motion } from "framer-motion";

const initialStages = [
  {
    id: "qualified",
    title: "Qualified",
    color: "bg-info",
    deals: [
      { id: "d1", name: "Enterprise Suite", company: "Acme Corp", value: "$45,000", avatar: "AC" },
      { id: "d2", name: "Pro Plan", company: "TechStart", value: "$12,000", avatar: "TS" },
    ],
  },
  {
    id: "proposal",
    title: "Proposal",
    color: "bg-accent",
    deals: [
      { id: "d3", name: "Custom Integration", company: "Global Corp", value: "$67,000", avatar: "GC" },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "bg-warning",
    deals: [
      { id: "d4", name: "Annual License", company: "DataFlow", value: "$38,000", avatar: "DF" },
      { id: "d5", name: "Platform Deal", company: "CloudPeak", value: "$92,000", avatar: "CP" },
    ],
  },
  {
    id: "closed",
    title: "Closed Won",
    color: "bg-success",
    deals: [
      { id: "d6", name: "Starter Plan", company: "BrightPath", value: "$8,500", avatar: "BP" },
    ],
  },
];

export default function Pipeline() {
  const [stages, setStages] = useState(initialStages);
  const [draggedDeal, setDraggedDeal] = useState(null);

  const handleDragStart = (deal, stageId) => {
    setDraggedDeal({ deal, fromStage: stageId });
  };

  const handleDrop = (toStageId) => {
    if (!draggedDeal || draggedDeal.fromStage === toStageId) return;

    setStages((prev) =>
      prev.map((stage) => {
        if (stage.id === draggedDeal.fromStage) {
          return {
            ...stage,
            deals: stage.deals.filter((d) => d.id !== draggedDeal.deal.id),
          };
        }

        if (stage.id === toStageId) {
          return {
            ...stage,
            deals: [...stage.deals, draggedDeal.deal],
          };
        }

        return stage;
      })
    );

    setDraggedDeal(null);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Sales Pipeline
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Drag and drop deals between stages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage.id)}
            className="bg-card rounded-xl border border-border p-4 min-h-[400px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
              <h3 className="font-heading font-semibold text-sm text-foreground">
                {stage.title}
              </h3>
              <span className="ml-auto text-xs font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                {stage.deals.length}
              </span>
            </div>

            <div className="space-y-3">
              {stage.deals.map((deal, i) => (
                <motion.div
                  key={deal.id}
                  draggable
                  onDragStart={() => handleDragStart(deal, stage.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-secondary/50 hover:bg-secondary rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                      {deal.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {deal.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deal.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-heading font-bold text-foreground">
                    {deal.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { motion } from "framer-motion";

// // ✅ Fixed Data
// const initialStages = [
//   {
//     id: "qualified",
//     title: "Qualified",
//     color: "bg-blue-500",
//     deals: [
//       { id: "d1", name: "Enterprise Suite", company: "Acme Corp", value: "$45,000", avatar: "AC" },
//       { id: "d2", name: "Pro Plan", company: "TechStart", value: "$12,000", avatar: "TS" },
//     ],
//   },
//   {
//     id: "proposal",
//     title: "Proposal",
//     color: "bg-purple-500",
//     deals: [
//       { id: "d3", name: "Custom Integration", company: "Global Corp", value: "$67,000", avatar: "GC" },
//     ],
//   },
//   {
//     id: "negotiation",
//     title: "Negotiation",
//     color: "bg-yellow-500",
//     deals: [
//       { id: "d4", name: "Annual License", company: "DataFlow", value: "$38,000", avatar: "DF" },
//       { id: "d5", name: "Platform Deal", company: "CloudPeak", value: "$92,000", avatar: "CP" },
//     ],
//   },
//   {
//     id: "closed",
//     title: "Closed Won",
//     color: "bg-green-500",
//     deals: [
//       { id: "d6", name: "Starter Plan", company: "BrightPath", value: "$8,500", avatar: "BP" },
//     ],
//   },
// ];

// export default function Pipeline() {
//   const [stages, setStages] = useState(initialStages);
//   const [draggedDeal, setDraggedDeal] = useState(null);

//   // ✅ Drag Start
//   const handleDragStart = (deal, fromStage) => {
//     setDraggedDeal({ deal, fromStage });
//   };

//   // ✅ Drop
//   const handleDrop = (toStageId) => {
//     if (!draggedDeal || draggedDeal.fromStage === toStageId) return;

//     setStages((prev) =>
//       prev.map((stage) => {
//         // Remove from old stage
//         if (stage.id === draggedDeal.fromStage) {
//           return {
//             ...stage,
//             deals: stage.deals.filter((d) => d.id !== draggedDeal.deal.id),
//           };
//         }

//         // Add to new stage
//         if (stage.id === toStageId) {
//           return {
//             ...stage,
//             deals: [...stage.deals, draggedDeal.deal],
//           };
//         }

//         return stage;
//       })
//     );

//     setDraggedDeal(null);
//   };

//   return (
//     <div className="p-6 max-w-[1600px] mx-auto space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-foreground">Sales Pipeline</h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Drag and drop deals between stages
//         </p>
//       </div>

//       {/* Pipeline Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

//         {stages.map((stage) => (
//           <div
//             key={stage.id}
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={() => handleDrop(stage.id)}
//             className="bg-card rounded-xl border border-border p-4 min-h-[400px]"
//           >
//             {/* Stage Header */}
//             <div className="flex items-center gap-2 mb-4">
//               <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
//               <h3 className="font-semibold text-sm text-foreground">
//                 {stage.title}
//               </h3>
//               <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded-full">
//                 {stage.deals.length}
//               </span>
//             </div>

//             {/* Deals */}
//             <div className="space-y-3">
//               {stage.deals.map((deal, i) => (
//                 <motion.div
//                   key={deal.id}
//                   draggable
//                   onDragStart={() => handleDragStart(deal, stage.id)}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   className="bg-secondary/50 hover:bg-secondary rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all border"
//                 >
//                   {/* Deal Top */}
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
//                       {deal.avatar}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="font-medium text-sm text-foreground truncate">
//                         {deal.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {deal.company}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Value */}
//                   <p className="text-sm font-bold text-foreground">
//                     {deal.value}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }