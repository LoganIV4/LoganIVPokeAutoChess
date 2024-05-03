import React from "react"
import { useTranslation } from "react-i18next"
import { PokemonClasses } from "../../../../../models/colyseus-models/pokemon"
import { PRECOMPUTED_REGIONAL_MONS } from "../../../../../models/precomputed"
import { DungeonDetails, DungeonPMDO } from "../../../../../types/enum/Dungeon"
import { PkmFamily, PkmIndex } from "../../../../../types/enum/Pokemon"
import { getPortraitSrc } from "../../../utils"
import SynergyIcon from "../icons/synergy-icon"

export function WikiDungeon() {
  const { t } = useTranslation()
  return (
    <div id="wiki-dungeon">
      <ul>
        {(Object.keys(DungeonPMDO) as DungeonPMDO[])
          .sort((a, b) => t(`map.${a}`).localeCompare(t(`map.${b}`)))
          .map((dungeon) => {
            return (
              <li key={dungeon} className="my-box">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{t(`map.${dungeon}`)}</h3>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {DungeonDetails[dungeon].synergies.map((synergy) => (
                      <SynergyIcon
                        type={synergy}
                        key={"map_synergy_" + synergy}
                      />
                    ))}
                  </div>
                </div>
                <img
                  src={`/assets/maps/${dungeon}-preview.png`}
                  alt={dungeon}
                />
                <div className="wiki-dungeon-regional-mons">
                    {PRECOMPUTED_REGIONAL_MONS
                    .filter((p) => PokemonClasses[p].prototype.isInRegion(p, dungeon))
                    .filter(
                      (pkm, index, array) => array.map(p => PkmFamily[p]).indexOf(PkmFamily[pkm]) === index // dedup same family
                    ).map(pkm => <img
                      key={pkm}
                      className="pokemon-portrait"
                      src={getPortraitSrc(PkmIndex[pkm])}
                    ></img>)}
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
