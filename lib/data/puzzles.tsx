import { Puzzle } from '../state/types'
import { p1_start } from './p1_start'
import { p2_smileys } from './p2_smileys'
import { p3_fliesen } from './p3_fliesen'
import { p4_säulen } from './p4_säulen'
import { p5_lol } from './p5_lol'
import { p7_rechteck } from './p7_rechteck'

export const puzzles: Puzzle[] = [
  p1_start,
  p2_smileys,
  p3_fliesen,
  p4_säulen,
  p5_lol,

  p7_rechteck,

  {
    id: 6,
    title: 'TODO 6',
    posX: 23,
    posY: 18,
    deps: [1],
    description: (
      <>
        <p className="mb-2">
          Ein schöner Fußboden macht immer eine Freude. Lege bei dieser Aufgabe
          den Boden einmal komplett mit Fliesen aus:
        </p>
        <img
          src="/puzzle/fliesen.png"
          alt="target"
          className="mx-auto my-3 max-h-[120px]"
        ></img>
        <p className="mb-2">
          Bei diesem Programm kommt eine Schleife zum Einsatz: Mit dem
          Schlüsselwort <em>wiederhole solange</em> kann Karol eine Aktion
          solange wiederholen, bis die Bedingung nicht mehr erfüllt ist. In
          diesem Fall legt er Fliesen bis zur nächsten Wand.
        </p>
      </>
    ),
    targetWorld: {
      dimX: 10,
      dimY: 4,
      height: 6,
      karol: { x: 0, y: 3, dir: 'west' },
      bricks: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      marks: [
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
      ],
      blocks: [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
      ],
    },
    code: 'wiederhole solange NichtIstWand\n  MarkeSetzen\n  Schritt\nendewiederhole\nMarkeSetzen',
  },

  {
    id: 8,
    title: 'TODO 8',
    posX: 31,
    posY: 24,
    deps: [1],
    description: (
      <>
        <p className="mb-2">
          Ein schöner Fußboden macht immer eine Freude. Lege bei dieser Aufgabe
          den Boden einmal komplett mit Fliesen aus:
        </p>
        <img
          src="/puzzle/fliesen.png"
          alt="target"
          className="mx-auto my-3 max-h-[120px]"
        ></img>
        <p className="mb-2">
          Bei diesem Programm kommt eine Schleife zum Einsatz: Mit dem
          Schlüsselwort <em>wiederhole solange</em> kann Karol eine Aktion
          solange wiederholen, bis die Bedingung nicht mehr erfüllt ist. In
          diesem Fall legt er Fliesen bis zur nächsten Wand.
        </p>
      </>
    ),
    targetWorld: {
      dimX: 10,
      dimY: 4,
      height: 6,
      karol: { x: 0, y: 3, dir: 'west' },
      bricks: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      marks: [
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
      ],
      blocks: [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
      ],
    },
    code: 'wiederhole solange NichtIstWand\n  MarkeSetzen\n  Schritt\nendewiederhole\nMarkeSetzen',
  },

  {
    id: 9,
    title: 'TODO 9',
    posX: 35,
    posY: 27,
    deps: [1],
    description: (
      <>
        <p className="mb-2">
          Ein schöner Fußboden macht immer eine Freude. Lege bei dieser Aufgabe
          den Boden einmal komplett mit Fliesen aus:
        </p>
        <img
          src="/puzzle/fliesen.png"
          alt="target"
          className="mx-auto my-3 max-h-[120px]"
        ></img>
        <p className="mb-2">
          Bei diesem Programm kommt eine Schleife zum Einsatz: Mit dem
          Schlüsselwort <em>wiederhole solange</em> kann Karol eine Aktion
          solange wiederholen, bis die Bedingung nicht mehr erfüllt ist. In
          diesem Fall legt er Fliesen bis zur nächsten Wand.
        </p>
      </>
    ),
    targetWorld: {
      dimX: 10,
      dimY: 4,
      height: 6,
      karol: { x: 0, y: 3, dir: 'west' },
      bricks: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      marks: [
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
        [true, true, true, true, true, true, true, true, true, true],
      ],
      blocks: [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
      ],
    },
    code: 'wiederhole solange NichtIstWand\n  MarkeSetzen\n  Schritt\nendewiederhole\nMarkeSetzen',
  },
]
