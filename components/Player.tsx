import {
  faDownload,
  faEquals,
  faExternalLink,
  faFileImport,
  faLeftLong,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faRightLong,
  faUpLong,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { createRef, Dispatch, SetStateAction, useEffect, useState } from 'react'

import { focusWrapper, focusWrapperDone } from '../lib/commands/focus'
import { serialize } from '../lib/commands/json'
import { restoreProject } from '../lib/commands/load'
import { execPreview, hidePreview, showPreview } from '../lib/commands/preview'
import { toggleWireframe } from '../lib/commands/view'
import { abort, run } from '../lib/commands/vm'
import {
  brick,
  createWorldCmd,
  forward,
  left,
  right,
  toggleBlock,
  toggleMark,
  unbrick,
} from '../lib/commands/world'
import { useCore } from '../lib/state/core'
import { FaIcon } from './FaIcon'
import { View } from './View'

export function Player() {
  const core = useCore()

  const [showNewWorldModal, setShowNewWorldModal] = useState(false)

  const [scale, setScale] = useState(1)

  const wrapper = createRef<HTMLDivElement>()

  useEffect(() => {
    wrapper.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (core.ws.ui.shouldFocusWrapper) {
      wrapper.current?.focus()
      focusWrapperDone(core)
    }
  })

  const actions: { [key: string]: () => void } = {
    ArrowLeft: () => {
      left(core)
    },
    ArrowRight: () => {
      right(core)
    },
    ArrowUp: () => {
      forward(core)
    },
    ArrowDown: () => {
      forward(core, { reverse: true })
    },
    KeyM: () => {
      toggleMark(core)
    },
    KeyH: () => {
      brick(core)
    },
    KeyQ: () => {
      toggleBlock(core)
    },
    KeyA: () => {
      unbrick(core)
    },
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-grow h-full min-h-0 relative">
        <div
          className="flex-grow overflow-auto flex flex-col justify-center h-full"
          onClick={(e) => {
            wrapper.current?.focus()
          }}
        >
          <div className="min-h-0 w-full">
            <div
              onKeyDown={(e) => {
                if (actions[e.code]) {
                  actions[e.code]()
                  setTimeout(() => {
                    execPreview(core)
                  }, 10)
                  e.preventDefault()
                  return
                }
                if (e.code == 'KeyS') {
                  if (
                    core.ws.ui.state == 'ready' &&
                    core.ws.vm.bytecode &&
                    core.ws.vm.bytecode.length > 0
                  ) {
                    run(core)
                  } else if (core.ws.ui.state == 'running') {
                    abort(core)
                  }
                  e.preventDefault()
                }
                if (e.code == 'KeyV') {
                  if (!core.ws.ui.showPreview) {
                    showPreview(core)
                    focusWrapper(core)
                    execPreview(core)
                  } else {
                    hidePreview(core)
                    focusWrapper(core)
                  }
                  e.preventDefault()
                }
              }}
              tabIndex={1}
              className={clsx(
                'border-white border-2 mb-32 mt-12 w-max h-max mx-auto cursor-pointer',
                'outline-none focus:border-green-200 active:border-green-200'
              )}
              ref={wrapper}
              style={{ transform: `scale(${scale})` }}
            >
              <View
                world={core.ws.world}
                wireframe={core.ws.ui.wireframe}
                preview={
                  core.ws.ui.showPreview ? core.ws.ui.preview : undefined
                }
              />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 bg-gray-50">
            {core.ws.ui.messages.map((m) => (
              <div key={`${m.ts}`}>
                {m.text}
                {m.count > 1 && <span> (x{m.count})</span>}
              </div>
            ))}
          </div>
          <div className="absolute right-3 bottom-2">
            <span
              onClick={() => {
                setScale((scale) => scale / 1.1)
              }}
            >
              <FaIcon
                icon={faMagnifyingGlassMinus}
                className="cursor-pointer"
              />
            </span>
            <span className="inline-block w-4" />
            <span
              onClick={() => {
                setScale(1)
              }}
            >
              <FaIcon icon={faEquals} className="cursor-pointer" />
            </span>
            <span className="inline-block w-4" />
            <span
              onClick={() => {
                setScale((scale) => scale * 1.1)
              }}
            >
              <FaIcon icon={faMagnifyingGlassPlus} className="cursor-pointer" />
            </span>
          </div>
          {core.ws.type == 'free' && (
            <div className="absolute left-1 top-1">
              {core.state.projectTitle ? (
                <>
                  <button
                    className="rounded px-2 py-0.5 bg-gray-100 hover:bg-gray-200"
                    onClick={() => {
                      abort(core)
                      restoreProject(core)
                    }}
                  >
                    Welt zurücksetzen
                  </button>
                  <button
                    className="rounded px-2 py-0.5 bg-gray-100 hover:bg-gray-200 ml-4"
                    onClick={() => {
                      window.open(`//${window.location.host}`, '_blank')
                    }}
                  >
                    Neues Fenster <FaIcon icon={faExternalLink} />
                  </button>
                  {renderExport()}
                </>
              ) : (
                <>
                  <button
                    className="rounded px-2 py-0.5 bg-gray-100 hover:bg-gray-200"
                    onClick={() => {
                      setShowNewWorldModal(true)
                    }}
                  >
                    Neue Welt
                  </button>
                  <button
                    className="rounded px-2 py-0.5 bg-gray-100 hover:bg-gray-200 ml-4"
                    onClick={() => {
                      document.getElementById('load_project')?.click()
                    }}
                  >
                    <FaIcon icon={faFileImport} /> Laden
                  </button>
                  {renderExport()}
                </>
              )}
            </div>
          )}
          {core.ws.type == 'puzzle' && (
            <button
              className={clsx(
                'absolute left-1 top-1 rounded',
                'px-2 py-0.5 bg-gray-100 hover:bg-gray-200'
              )}
              onClick={() => {
                abort(core)
                createWorldCmd(
                  core,
                  core.ws.world.dimX,
                  core.ws.world.dimY,
                  core.ws.world.height
                )
              }}
            >
              Neu starten
            </button>
          )}
        </div>
      </div>

      {core.ws.type == 'puzzle' && (
        <div className="flex justify-between items-center select-none h-12 border-t flex-grow-0 flex-shrink-0">
          <div className="pl-4">Fortschritt:</div>
          <div
            className={clsx(
              'bg-gray-200 w-full px-1 mx-3 relative flex justify-around',
              'items-center'
            )}
          >
            <div
              className={clsx(
                'absolute left-0 top-0 bottom-0',
                core.ws.progress < 100 ? 'bg-yellow-200' : 'bg-green-300'
              )}
              style={{
                width: `${core.ws.progress}%`,
              }}
            ></div>
            <div className="z-10">{core.ws.progress}%</div>
          </div>
        </div>
      )}

      <div
        className={clsx(
          'flex-shrink-0 flex justify-around items-center border-t',
          'h-12'
        )}
      >
        <div>
          <button
            className="mx-3 py-2"
            onClick={() => {
              left(core)
              setTimeout(() => {
                execPreview(core)
              }, 10)
            }}
            title="LinksDrehen"
          >
            <FaIcon icon={faLeftLong} />
          </button>
          <button
            className=" px-2"
            onClick={() => {
              forward(core)
              setTimeout(() => {
                execPreview(core)
              }, 10)
            }}
            title="Schritt"
          >
            <FaIcon icon={faUpLong} />
          </button>
          <button
            className="mx-3 py-2"
            onClick={() => {
              right(core)
              setTimeout(() => {
                execPreview(core)
              }, 10)
            }}
            title="RechtsDrehen"
          >
            <FaIcon icon={faRightLong} />
          </button>
          <button
            className="mx-2"
            onClick={() => {
              brick(core)
              setTimeout(() => {
                execPreview(core)
              }, 10)
            }}
            title="Hinlegen"
          >
            H
          </button>
          <button
            className="mx-3"
            onClick={() => {
              unbrick(core)
              setTimeout(() => {
                execPreview(core)
              }, 10)
            }}
            title="Aufheben"
          >
            A
          </button>
          <button
            className="mx-3"
            onClick={() => {
              toggleMark(core)
              setTimeout(() => {
                execPreview(core)
              }, 10)
            }}
            title="MarkeSetzen / MarkeLöschen"
          >
            M
          </button>
          <button
            className="mx-3"
            onClick={() => {
              toggleBlock(core)
              setTimeout(() => {
                execPreview(core)
              }, 10)
            }}
            title="Quader setzen oder löschen"
          >
            Q
          </button>
          <span className="ml-4 h-7 border-r"></span>
          {
            <img
              src={
                core.ws.ui.wireframe
                  ? '/Ansicht_frame.png'
                  : '/Ansicht_voll.png'
              }
              title="Darstellung der Ziegel umschalten"
              alt="umschalten"
              className="inline-block h-5 pb-0.5 pl-1.5 cursor-pointer ml-3"
              onClick={() => {
                toggleWireframe(core)
                if (wrapper.current) {
                  wrapper.current.focus()
                }
              }}
            />
          }
        </div>
      </div>
      {showNewWorldModal && (
        <div
          className={clsx(
            'fixed inset-0 bg-gray-300 bg-opacity-30 flex justify-around',
            'items-center z-[200]'
          )}
          onClick={() => setShowNewWorldModal(false)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className={clsx(
              'fixed mx-auto bg-white opacity-100 rounded w-[400px] z-[300]',
              'top-[30vh]'
            )}
          >
            <NewWorldSettings
              dimX={core.ws.world.dimX}
              dimY={core.ws.world.dimY}
              height={core.ws.world.height}
              onDone={() => {
                setShowNewWorldModal(false)
                wrapper.current?.focus()
              }}
            />
            <div
              className="absolute top-2 right-2 h-3 w-3 cursor-pointer"
              onClick={() => setShowNewWorldModal(false)}
            >
              <FaIcon icon={faXmark} />
            </div>
          </div>
        </div>
      )}
    </div>
  )

  function renderExport() {
    return (
      <button
        className="rounded px-2 py-0.5 bg-gray-100 hover:bg-gray-200 ml-4"
        onClick={() => {
          const date = new Date()
          const filename =
            date.toLocaleDateString('en-CA') +
            '_' +
            date.getHours().toString().padStart(2, '0') +
            date.getMinutes().toString().padStart(2, '0') +
            date.getSeconds().toString().padStart(2, '0') +
            '_robot-karol.json'
          const contentType = 'application/json;charset=utf-8;'
          var a = document.createElement('a')
          a.download = filename
          a.href =
            'data:' +
            contentType +
            ',' +
            encodeURIComponent(JSON.stringify(serialize(core)))
          a.target = '_blank'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }}
      >
        <FaIcon icon={faDownload} /> Speichern
      </button>
    )
  }
}

function NewWorldSettings({
  dimX,
  dimY,
  height,
  onDone,
}: {
  dimX: number
  dimY: number
  height: number
  onDone: () => void
}) {
  const [localDimX, setLocalDimX] = useState(dimX)
  const [localDimY, setLocalDimY] = useState(dimY)

  const [localHeight, setLocalHeight] = useState(height)

  const core = useCore()

  const canCreate = localDimX > 0 && localDimY > 0 && localHeight > 0

  return (
    <>
      <div className="m-3 mb-6 text-xl font-bold">Neue Welt erstellen</div>
      <div className="flex justify-between m-3">
        <span>⟷ Breite:</span>
        {buildInput(localDimX, setLocalDimX, 100)}
      </div>
      <div className="flex justify-between m-3">
        <span>
          <span className="inline-block -rotate-45">⟷</span> Länge:
        </span>
        {buildInput(localDimY, setLocalDimY, 100)}
      </div>
      <div className="flex justify-between m-3">
        <span>
          <span className="inline-block rotate-90">⟷</span> Höhe:
        </span>
        {buildInput(localHeight, setLocalHeight, 10)}
      </div>
      <div className="my-4">
        <button
          className={clsx(
            'ml-4 rounded px-2 py-0.5',
            canCreate ? 'bg-green-300' : 'bg-gray-50'
          )}
          disabled={canCreate ? undefined : true}
          onClick={() => {
            createWorldCmd(core, localDimX, localDimY, localHeight)
            setTimeout(() => {
              execPreview(core)
            }, 10)
            onDone()
          }}
        >
          Welt erstellen
        </button>
      </div>
    </>
  )

  function buildInput(
    val: number,
    setter: Dispatch<SetStateAction<number>>,
    max: number
  ) {
    return (
      <input
        value={val == -1 ? '' : val}
        onChange={(e) => {
          const val = parseInt(e.target.value)
          if (isNaN(val)) {
            setter(-1)
          }
          if (val >= 0 && val <= max) {
            setter(val)
          }
        }}
        onKeyDown={(e) => {
          if (e.key == 'Enter' && canCreate) {
            createWorldCmd(core, localDimX, localDimY, localHeight)
            onDone()
          }
        }}
        type="number"
        className="border-2"
        min={1}
        max={max}
      />
    )
  }
}
