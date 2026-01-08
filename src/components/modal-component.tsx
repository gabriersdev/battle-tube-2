import {Button, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, ModalTitle, OverlayTrigger, Tooltip} from "react-bootstrap";
import React, {useContext, useEffect} from "react";
import {Theme} from "@/components/tier-list-context";
import Image from "next/image";

import KickLogo from "../../public/kick.svg";
import TwitchLogo from "../../public/twitch.jpg";
import {Dropdown} from "react-bootstrap";
import {tiers} from "@/components/use-tier-list";
import Lib from "@/utils/lib";
import Iframe from "@/components/iframe";
import Link from "next/link";
import VoidUser from "@/components/void-user";
import {targetExternalLink} from "@/resources/config";

export function ModalComponent() {
  const {
    showClipData,
    setShowClipData,
    showModal,
    setShowModal,
    items,
    setItems,
  } = useContext(Theme);
  
  const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);
  
  useEffect(() => {
    console.log("handle!")
    console.log(showClipData);
  }, [showClipData]);
  
  const handleTierSelect = (tier: string) => {
    if (!showClipData) return;
    
    setItems((prev) => prev.map((item) => {
      if (item.id === showClipData.id) {
        return {
          ...item,
          tier: tier as never
        }
      }
      return item;
    }));
  };
  
  const currentItem = showClipData ? items.find(i => i.id === showClipData.id) : null;
  const currentTier = currentItem?.tier;
  
  const platform = showClipData ? Lib.getClipOrigin(showClipData) : "";
  const clipId = showClipData ? Lib.getClipID(showClipData) : "";
  
  // Filter items to match the order in selection.tsx (shuffled if in pool, sorted by title if in tier)
  // However, selection.tsx uses Lib.shuffled(items) inside renderDraggableItems.
  // This means the order is random every render if we just call Lib.shuffled(items).
  // But wait, Lib.shuffled returns a NEW array.
  // If selection.tsx calls Lib.shuffled(items) on every render, the order changes on every render?
  // Let's check selection.tsx again.
  // In selection.tsx: renderDraggableItems calls Lib.shuffled(items).filter(...).toSorted(...)
  // Wait, if it's shuffled then sorted, the shuffle is useless if the sort is deterministic on the whole set.
  // But it filters by tier first? No.
  // Lib.shuffled(items).filter(...).toSorted(...)
  // If toSorted is used, the order is determined by the sort key (title).
  // So the shuffle is redundant if toSorted is called afterwards on the same list.
  
  // However, the user request says: "aplique o método shuffled para iterar os clips da @/src/components/selection.tsx e que o @/src/components/modal-component.tsx tenha a mesma ordem de clipes que os que foram iterados em selection.tsx"
  
  // In selection.tsx (from previous read):
  // const renderDraggableItems = (currentTier: TierLevel | 'pool') => {
  //   return Lib.shuffled(items)
  //     .filter((item) => item.tier === currentTier)
  //     .toSorted((a, b) => a.title.localeCompare(b.title))
  //     ...
  
  // If I look at the code I just wrote to use-tier-list.tsx (which seems to be where renderDraggableItems is defined now, moved from selection.tsx context? No, selection.tsx uses it from context).
  // Wait, I modified use-tier-list.tsx.
  // In use-tier-list.tsx:
  // const renderDraggableItems = (currentTier: TierLevel | 'pool') => {
  //   return items
  //     .filter((item) => item.tier === currentTier)
  //     .map(...)
  
  // I removed the shuffle and sort from renderDraggableItems in use-tier-list.tsx in my previous step?
  // Let me check what I wrote to use-tier-list.tsx.
  // I wrote:
  // const initialItems: TierItem[] = Lib.shuffled((clipsData as ClipData[]).map(...));
  // And renderDraggableItems:
  // return items.filter((item) => item.tier === currentTier).map(...)
  
  // So the items are shuffled INITIALLY.
  // And renderDraggableItems just iterates over them.
  // So the order in items state IS the order.
  
  // So in ModalComponent, I should just use `items` directly, but I need to respect the filtering that might be happening visually?
  // The modal navigation (next/previous) should follow the visual order.
  // Since `items` is the source of truth and it is already shuffled (at initialization), iterating `items` should be consistent.
  
  // However, in the modal, we might want to navigate through ALL items or just the items in the current view?
  // Usually next/prev in a modal iterates through the context the user is in.
  // If the user clicked a clip in 'pool', next should be the next clip in 'pool'.
  // If the user clicked a clip in 'S' tier, next should be the next clip in 'S' tier.
  
  // The user request says: "que o @/src/components/modal-component.tsx tenha a mesma ordem de clipes que os que foram iterados em selection.tsx"
  
  // In selection.tsx (which uses renderDraggableItems from context), the items are displayed based on `items` state.
  // Since I moved the shuffle to initialization, `items` array has the shuffled order.
  
  // So, if I just iterate `items`, I am iterating the shuffled order.
  // BUT, `items` contains ALL items (pool + tiers).
  // When I am in the modal, if I press next, do I go to the next item in the `items` array?
  // Yes, that seems to be what is implemented:
  // const currentIndex = items.findIndex(i => i.id === showClipData.id);
  // setShowClipData(items[currentIndex + 1]);
  
  // So if `items` is shuffled at init, this order is preserved.
  
  // However, there is a catch.
  // In the previous code of `use-tier-list.tsx` (before my edit), `renderDraggableItems` was doing:
  // Lib.shuffled(items).filter(...).toSorted(...)
  // This means it was shuffling AND THEN sorting by title?
  // If it sorts by title, the shuffle is useless.
  // UNLESS `toSorted` is not stable or something? No, `toSorted` sorts.
  // If I have [A, B, C], shuffle -> [B, A, C], sort -> [A, B, C].
  // So the shuffle was doing nothing if sort was applied.
  
  // But wait, the user asked to "apply shuffled method to iterate clips of selection.tsx".
  // And "modal-component.tsx have the same order".
  
  // If I look at `use-tier-list.tsx` BEFORE my change:
  // It was:
  // const renderDraggableItems = (currentTier: TierLevel | 'pool') => {
  //   return Lib.shuffled(items)
  //     .filter((item) => item.tier === currentTier)
  //     .toSorted((a, b) => a.title.localeCompare(b.title))
  
  // If the user wants "shuffled", maybe they want to REMOVE the sort?
  // Or maybe they want the shuffle to happen?
  
  // If I look at `Lib.shuffled`:
  // static shuffled(unshuffled: TierItem[]) {
  //   return unshuffled
  //     .map((value: TierItem) => ({value, sort: Math.random()}))
  //     .sort((a, b) => a.sort - b.sort)
  //     .map(({value}: {value: TierItem}) => value)
  // }
  
  // If I use `Lib.shuffled(items)` inside render, it changes order every render. That's bad UI.
  // That's why I moved it to `initialItems`.
  
  // Now about ModalComponent.
  // It uses `items` from context.
  // `items` is now shuffled at init.
  // So `items` has a random order that persists.
  
  // But in ModalComponent, we are iterating `items`.
  // `items` contains everything.
  // If I am viewing a clip that is in 'pool', and the next item in `items` is in 'S' tier, should I show it?
  // The current implementation does:
  // const currentIndex = items.findIndex(i => i.id === showClipData.id);
  // setShowClipData(items[currentIndex + 1]);
  
  // This iterates the global list `items`.
  
  // If the user wants the modal to follow the order of `selection.tsx`, and `selection.tsx` displays items based on `items` (filtered by tier), then the global order in `items` matters.
  
  // If `selection.tsx` displays:
  // Pool: [Item A, Item C, Item E] (filtered from items)
  // Tier S: [Item B, Item D]
  
  // If `items` is [A, B, C, D, E] (shuffled).
  // Pool shows A, C, E.
  // Tier S shows B, D.
  
  // If I click A (in Pool). Next in `items` is B (in Tier S).
  // Does the user expect to see B? Or C (next in Pool)?
  
  // "que o @/src/components/modal-component.tsx tenha a mesma ordem de clipes que os que foram iterados em selection.tsx"
  // "iterated in selection.tsx"
  
  // In selection.tsx, we render draggable items for each tier AND pool.
  // But we don't iterate ALL of them in one go in the UI. They are in different boxes.
  
  // If the user means "the order defined in selection.tsx", maybe they mean the order of the array used to render?
  
  // If I look at `use-tier-list.tsx` again.
  // I removed `.toSorted(...)`.
  // So now `renderDraggableItems` just filters `items`.
  // `items` is shuffled.
  
  // So the order in `selection.tsx` (visual order in each box) corresponds to the order in `items` (filtered).
  
  // So if `items` is [A, B, C].
  // A is pool. B is pool. C is pool.
  // Visual: A, B, C.
  // Modal Next: A -> B -> C.
  
  // If A is pool, B is S, C is pool.
  // Visual Pool: A, C.
  // Visual S: B.
  // Modal Next (from A): B (which is in S).
  
  // Is this what is expected?
  // "mesma ordem de clipes que os que foram iterados em selection.tsx"
  
  // If "iterated in selection.tsx" refers to the `items` array which is the source of truth for selection.tsx, then yes.
  
  // But wait, I need to make sure `ModalComponent` uses the same `items` list.
  // It does use `items` from context.
  
  // Is there anything else to change in `ModalComponent`?
  // The user said "aplique o método shuffled para iterar os clips da @/src/components/selection.tsx".
  // I did that by shuffling `initialItems` in `use-tier-list.tsx`.
  // And I removed the `.toSorted` which was overriding the shuffle (if it was there).
  
  // Wait, in `use-tier-list.tsx` BEFORE my change, `renderDraggableItems` had:
  // return Lib.shuffled(items).filter(...).toSorted(...)
  
  // If I removed `Lib.shuffled` from `renderDraggableItems` and put it in `initialItems`, I made the shuffle persistent (good).
  // And I removed `.toSorted`.
  
  // Now `ModalComponent`.
  // It iterates `items`.
  // `items` is shuffled.
  
  // So `ModalComponent` iterates the shuffled items.
  
  // Is there any discrepancy?
  // In `ModalComponent`, `handlePrevious` and `handleNext` use `items`.
  
  // const handlePrevious = () => {
  //   if (!showClipData) return;
  //   const currentIndex = items.findIndex(i => i.id === showClipData.id);
  //   if (currentIndex > 0) {
  //     setShowClipData(items[currentIndex - 1]);
  //   } else {
  //     setShowClipData(items[items.length - 1]);
  //   }
  // };
  
  // This looks correct assuming `items` is the list we want to iterate.
  
  // Let's verify if `selection.tsx` does anything else.
  // `selection.tsx` calls `renderDraggableItems`.
  // `renderDraggableItems` (now in `use-tier-list.tsx`) uses `items`.
  
  // So both use `items`.
  
  // The only thing is: `ModalComponent` iterates the WHOLE list, jumping between tiers if they are interleaved in the `items` array.
  // If the user wants to iterate ONLY the visible items in the current context (e.g. only pool items if I clicked a pool item), that would be different.
  // But the request says "mesma ordem de clipes que os que foram iterados em selection.tsx".
  // Since `selection.tsx` renders ALL tiers (it has the container for tiers and the container for pool), it "iterates" all of them (conceptually).
  
  // However, `selection.tsx` renders them by calling `renderDraggableItems` multiple times (once per tier + pool).
  // But the underlying data is `items`.
  
  // If the user implies that `selection.tsx` was shuffling items on render (which it was doing before my change, although sorting immediately after), and now they want consistent order.
  
  // Wait, if `selection.tsx` was doing `Lib.shuffled(items).filter(...).toSorted(...)`, the shuffle was useless because of `toSorted`.
  // Unless `toSorted` is stable and there are duplicate titles? Unlikely to be the main point.
  
  // Maybe the user wants the items to be shuffled AND NOT SORTED?
  // I did remove the sort in `use-tier-list.tsx`.
  
  // So, `items` is shuffled. `selection.tsx` shows them in that shuffled order (filtered by tier). `ModalComponent` iterates them in that shuffled order.
  
  // It seems I have already achieved the goal by modifying `use-tier-list.tsx`.
  // But the user explicitly mentioned `ModalComponent` in the request.
  // "e que o @/src/components/modal-component.tsx tenha a mesma ordem de clipes que os que foram iterados em selection.tsx"
  
  // Maybe I should ensure `ModalComponent` logic is robust?
  // It seems fine.
  
  // Let's double check if `ModalComponent` needs any change.
  // It uses `items` from context.
  // `items` is the state in `use-tier-list.tsx`.
  
  // If I look at `ModalComponent` code again.
  // It has `handlePrevious` and `handleNext`.
  
  // Is it possible that `items` in `ModalComponent` is different? No, it's from Context.
  
  // One detail: `selection.tsx` renders items.
  // `ModalComponent` is a modal.
  
  // If I changed `use-tier-list.tsx`, I changed the source of truth.
  // So both should be in sync.
  
  // Let's verify if I need to change anything in `ModalComponent` to explicitly support the "shuffled" requirement if it wasn't using `items` directly?
  // It IS using `items` directly.
  
  // Maybe the user wants me to REMOVE any sorting in `ModalComponent` if there was any?
  // There is no sorting in `ModalComponent`. It just finds index in `items`.
  
  // So, the changes in `use-tier-list.tsx` should be enough.
  // But I should check if `selection.tsx` has any local logic.
  // `selection.tsx` uses `renderDraggableItems` from context.
  
  // Wait, I see `Lib.shuffled` being used in `use-tier-list.tsx` (which I added).
  // And I removed `.toSorted`.
  
  // So `items` are shuffled at start.
  // `renderDraggableItems` just maps them.
  // `ModalComponent` iterates them.
  
  // This seems correct.
  
  // However, I should check if `ModalComponent` is importing `Lib` and using it for something that might conflict?
  // It imports `Lib`.
  // It uses `Lib.getClipOrigin`, `Lib.getClipID`.
  
  // It does NOT use `Lib.shuffled`.
  
  // So, I think I'm good.
  // I will just write `ModalComponent` to ensure it's clean (maybe I don't need to change it, but the user mentioned it).
  // Actually, looking at `ModalComponent`, I don't see any logic that needs changing if `items` is already the correct order.
  
  // BUT, the user request: "aplique o método shuffled para iterar os clips da @/src/components/selection.tsx"
  // I did this in `use-tier-list.tsx` (which provides data to selection.tsx).
  
  // "e que o @/src/components/modal-component.tsx tenha a mesma ordem de clipes que os que foram iterados em selection.tsx"
  // This implies that previously they might have been different?
  // Previously `renderDraggableItems` was doing `Lib.shuffled(items)...`.
  // So `selection.tsx` was showing a shuffled list (if we ignore the sort for a moment, or if the sort was the issue).
  // And `ModalComponent` was iterating `items` (which was NOT shuffled, it was `initialItems` or whatever state).
  
  // So `selection.tsx` had a DIFFERENT order than `ModalComponent`.
  // `selection.tsx` -> Shuffled (and sorted).
  // `ModalComponent` -> Original order (or whatever order `items` had).
  
  // By moving the shuffle to `initialItems` (the state initialization), `items` ITSELF is now shuffled.
  // So `selection.tsx` (using `items`) and `ModalComponent` (using `items`) will now see the SAME order.
  
  // So my change in `use-tier-list.tsx` solves both parts of the request.
  // 1. Applies shuffle to clips in selection (by shuffling the source).
  // 2. Ensures modal has the same order (because both use the source).
  
  // I don't need to edit `ModalComponent` or `selection.tsx` if the logic is centralized in `use-tier-list.tsx`.
  // But I should check if `selection.tsx` has any other iteration logic.
  // `selection.tsx` uses `renderDraggableItems`.
  
  // Wait, `selection.tsx` has:
  // {Lib.greaterThan(items.filter(i => i.tier !== "pool").length, 0, "nenhum clipe")}
  // This is just counting.
  
  // So, I think I am done with the logic changes.
  // I'll just verify `selection.tsx` content again to be sure I didn't miss any direct usage of `Lib.shuffled`.
  // I read `selection.tsx` in the beginning.
  // It calls `renderDraggableItems`.
  
  // It does NOT call `Lib.shuffled` directly.
  
  // So, the only file that needed change was `use-tier-list.tsx`.
  // But the user request mentions editing `selection.tsx` and `modal-component.tsx`?
  // "aplique o método shuffled para iterar os clips da @/src/components/selection.tsx"
  // "e que o @/src/components/modal-component.tsx tenha a mesma ordem..."
  
  // It's a request to make it happen. If I can make it happen by editing the hook they share, that's better.
  
  // However, I should probably check if `ModalComponent` needs to be touched to trigger a rebuild or something? No.
  
  // Let's verify `use-tier-list.tsx` again.
  // I replaced:
  // const initialItems: TierItem[] = (clipsData as ClipData[]).map(...)
  // with:
  // const initialItems: TierItem[] = Lib.shuffled((clipsData as ClipData[]).map(...));
  
  // And I replaced:
  // const renderDraggableItems = ... Lib.shuffled(items).filter(...).toSorted(...)
  // with:
  // const renderDraggableItems = ... items.filter(...).map(...)
  
  // This seems correct and sufficient.
  
  // I will just confirm that `ModalComponent` doesn't have any local sorting.
  // I read `ModalComponent` and it iterates `items` using `findIndex`.
  // No sorting there.
  
  // So I am confident.
  
  // Wait, I should check if `Lib.shuffled` is imported in `use-tier-list.tsx`.
  // Yes, `import Lib from "@/utils/lib";` is there.
  
  // One small thing: `Lib.shuffled` returns `any`?
  // Let's check `Lib.ts`.
  // static shuffled(unshuffled: TierItem[]) { ... }
  // It returns `TierItem[]` (inferred).
  
  // So `initialItems` type is correct.
  
  // I'll just output the confirmation.
  
  // Wait, I see I haven't edited `selection.tsx` or `modal-component.tsx`.
  // The user might expect me to edit them if they mentioned them?
  // But if the logic is in the hook, editing the hook is the right way.
  
  // I'll double check `selection.tsx` imports.
  // It imports `Lib`.
  // It uses `Lib.greaterThan`.
  
  // I'll double check `modal-component.tsx` imports.
  // It imports `Lib`.
  // It uses `Lib.getClipOrigin`, `Lib.getClipID`.
  
  // Everything seems fine.
  
  // I will write to `modal-component.tsx` just to be safe? No, that's bad practice if no changes are needed.
  // I will explain in the thought process that the changes in `use-tier-list.tsx` cover the requirements.
  
  // Wait, I might have missed something.
  // "aplique o método shuffled para iterar os clips da @/src/components/selection.tsx"
  // Maybe the user wants the shuffle to happen ONLY in selection.tsx?
  // If I shuffle in `initialItems`, it is shuffled everywhere.
  // If I shuffle ONLY in `selection.tsx` (via `renderDraggableItems`), then `items` state remains unshuffled.
  // Then `ModalComponent` (which uses `items`) would see unshuffled items.
  // BUT the user wants `ModalComponent` to have the SAME order as `selection.tsx`.
  // So if `selection.tsx` is shuffled, `ModalComponent` must be shuffled too.
  // So shuffling the SOURCE (`items`) is the correct solution to ensure both are in sync.
  
  // If I only shuffled in `renderDraggableItems`, I would have to also shuffle in `ModalComponent` with the SAME seed?
  // But `Lib.shuffled` uses `Math.random()`. So I cannot reproduce the shuffle easily unless I store the shuffled list.
  // Storing the shuffled list IS what I did by shuffling `initialItems`.
  
  // So my solution is the only robust one.
  
  // I'll verify if `ModalComponent` has any other logic.
  // It has `handleTierSelect`.
  // It updates `items`.
  // setItems((prev) => prev.map(...))
  // This preserves order.
  
  // So the order remains consistent.
  
  // I'm good.

  const handlePrevious = () => {
    if (!showClipData) return;
    const currentIndex = items.findIndex(i => i.id === showClipData.id);
    if (currentIndex > 0) {
      setShowClipData(items[currentIndex - 1]);
    } else {
      setShowClipData(items[items.length - 1]);
    }
  };
  
  const handleNext = () => {
    if (!showClipData) return;
    const currentIndex = items.findIndex(i => i.id === showClipData.id);
    if (currentIndex < items.length - 1) {
      setShowClipData(items[currentIndex + 1]);
    } else {
      setShowClipData(items[0]);
    }
  };
  
  return (
    <>
      <Modal show={showModal} onHide={handleClose} size={"xl"}>
        <ModalHeader closeButton className={"align-items-start"}>
          <ModalTitle className={"d-flex align-items-center justify-content-between flex-wrap gap-3 pe-2 w-100"}>
            <Link href={showClipData?.url ?? ""} target={targetExternalLink} className={"text-decoration-none"}>
              <div className={"d-flex align-items-center gap-0"}>
                <span className={"fs-3 line-clamp-1"}>
                  {showClipData?.title ?? "Nome do clipe"}
                </span>
                <span>
                  {platform === "twitch" && <Image src={TwitchLogo} alt={"Logo da plataforma"} width={50} height={50} className={"object-fit-contain"} style={{maxHeight: "25px", maxWidth: "50px"}}/>}
                  {platform === "kick" && <Image src={KickLogo} alt={"Logo da plataforma"} width={50} height={50} className={"object-fit-contain ms-2"} style={{maxHeight: "25px", maxWidth: "50px"}}/>}
                </span>
              </div>
              <span className={"d-block text fw-normal text-body-secondary"}>
                {showClipData?.author ?? <VoidUser/>}
              </span>
            </Link>
            
            <div className="d-flex gap-2 align-items-center">
              <Dropdown>
                <DropdownToggle variant="success" id="dropdown-classified-clip" className={"text"} size={"sm"}>
                  <span className={"text-small"}>Classificar como</span>
                </DropdownToggle>
                
                <DropdownMenu className={"text"}>
                  {
                    tiers?.map((tier, index) => (
                      <DropdownItem onClick={() => handleTierSelect(tier)} key={index} className={`tier-list text-white ${tier.toLowerCase()} d-flex align-items-center gap-1 flex-wrap`}>
                        {tier}
                        {currentTier === tier && (
                          <OverlayTrigger overlay={
                            <Tooltip>
                              <span className={"font-inter text-small d-block text-balance line-clamp-2"}>O clipe está classificado como {"\""}{tier}{"\""}</span>
                            </Tooltip>
                          }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                            </svg>
                          </OverlayTrigger>
                        )}
                      </DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
          </ModalTitle>
        </ModalHeader>
        
        <ModalBody className={"min-vh-80 overflow-y-scroll overflow-x-auto position-relative"}>
          {platform === "twitch" && clipId ? (
            <Iframe id={clipId} allowFullScreen={true} width="100%" height="100%" style={{minHeight: "calc(80vh - 2rem)"}} ignoreResponsiveWidth={true}/>
          ) : (
            <div style={{minHeight: "calc(80vh - 2rem)", background: "#0c0c0c"}} className={"d-flex justify-content-center align-items-center"}>
              <div className={"d-flex align-items-center justify-content-center flex-wrap gap-3 text-white flex-column"}>
                <h2 style={{maxWidth: "600px"}}>
                  <span className={"text-balance d-block mx-auto text-center"}>
                    Iframe não suportado. Veja este clipe na KICK!
                  </span>
                </h2>
                <Button className={"text d-inline-flex align-items-center justify-content-center flex-wrap gap-1"} href={showClipData?.url} target={targetExternalLink}>
                  Assistir na KICK{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#1f1f1f">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                  </svg>
                </Button>
              </div>
            </div>
          )}
          
          <div
            className={'d-flex align-items-center flex-wrap gap-2 position-absolute'}
            style={{bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)'}}
          >
            <Button variant="outline-secondary" size="sm" onClick={handlePrevious}>
              {/*<span className={'text-small'}>Clipe anterior</span>*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={handleNext}>
              {/*<span className={'text-small'}>Próximo clipe</span>*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
