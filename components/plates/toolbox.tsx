'use client'
import { Cell } from '../sheet/cell'
import { Plate } from './plate'
import { ToolboxStage } from './toolbox-stage'

/**
 * P/05. Everything Edoardo ships with, as mono tags that fall into a ruled container and can be
 * dragged and thrown. Switching the theme flips gravity for a moment. The list is real text in
 * document order, so with no physics, no JavaScript or reduced motion it is simply a list.
 */
export function Toolbox({ tags }: { tags: string[] }) {
  return (
    <Plate
      id="toolbox"
      className="toolbox-plate"
      meta={<span>Everything I ship with. Drag them, throw them</span>}
    >
      <Cell col={1} end={13} l r b flush>
        <ToolboxStage tags={tags} />
      </Cell>
    </Plate>
  )
}
