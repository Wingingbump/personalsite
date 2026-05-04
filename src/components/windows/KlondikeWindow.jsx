import { useState, useCallback, useMemo, useEffect, useRef } from 'react'

const SUIT_DEF = {
  bass:  { color: 'black', label: 'Bass'  },
  trout: { color: 'red',   label: 'Trout' },
  lure:  { color: 'red',   label: 'Lure'  },
  hook:  { color: 'black', label: 'Hook'  },
}
const SUIT_IDS = ['bass', 'trout', 'lure', 'hook']
const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const RANK_VALUE = Object.fromEntries(RANKS.map((r, i) => [r, i + 1]))

const COLOR_RED = '#c0382a'
const COLOR_BLK = '#1a2030'
const FELT      = '#2f6f4a'
const FELT_DARK = '#1f4a32'

const px = { imageRendering: 'pixelated', shapeRendering: 'crispEdges', display: 'block' }

function Suit({ id, size = 10 }) {
  const c = SUIT_DEF[id].color === 'red' ? COLOR_RED : COLOR_BLK
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={px}>
      {id === 'bass' && (
        <>
          <rect x="2" y="4" width="6" height="4" fill={c}/>
          <rect x="3" y="3" width="4" height="6" fill={c}/>
          <rect x="8" y="5" width="2" height="2" fill={c}/>
          <rect x="9" y="3" width="1" height="2" fill={c}/>
          <rect x="9" y="7" width="1" height="2" fill={c}/>
          <rect x="3" y="5" width="1" height="1" fill="#fff"/>
        </>
      )}
      {id === 'trout' && (
        <>
          <rect x="1" y="5" width="7" height="2" fill={c}/>
          <rect x="2" y="4" width="5" height="4" fill={c}/>
          <rect x="8" y="4" width="2" height="2" fill={c}/>
          <rect x="8" y="6" width="2" height="2" fill={c}/>
          <rect x="9" y="3" width="1" height="2" fill={c}/>
          <rect x="9" y="7" width="1" height="2" fill={c}/>
          <rect x="2" y="5" width="1" height="1" fill="#fff"/>
        </>
      )}
      {id === 'lure' && (
        <>
          <rect x="4" y="2" width="3" height="6" fill={c}/>
          <rect x="3" y="3" width="5" height="4" fill={c}/>
          <rect x="3" y="3" width="2" height="2" fill="#fff"/>
          <rect x="5" y="3" width="2" height="1" fill={c}/>
          <rect x="5" y="8" width="1" height="2" fill="#888"/>
          <rect x="4" y="9" width="3" height="1" fill="#888"/>
        </>
      )}
      {id === 'hook' && (
        <>
          <rect x="6" y="1" width="1" height="6" fill={c}/>
          <rect x="6" y="7" width="3" height="1" fill={c}/>
          <rect x="8" y="6" width="1" height="2" fill={c}/>
          <rect x="3" y="6" width="1" height="2" fill={c}/>
          <rect x="3" y="5" width="2" height="1" fill={c}/>
          <rect x="4" y="4" width="2" height="1" fill={c}/>
          <rect x="6" y="0" width="2" height="1" fill="#888"/>
        </>
      )}
    </svg>
  )
}

const CARD_W = 56
const CARD_H = 78
const CARD_GAP = 8
const FAN_DOWN = 18
const FAN_DOWN_FACEDOWN = 8

function CardFace({ card, dim }) {
  const color = SUIT_DEF[card.suit].color === 'red' ? COLOR_RED : COLOR_BLK
  return (
    <div style={{
      width: CARD_W, height: CARD_H,
      background: '#fdfdf5',
      boxShadow: 'inset -1px -1px #888, inset 1px 1px #fff, 1px 1px 0 rgba(0,0,0,0.4)',
      border: '1px solid #000',
      position: 'relative',
      opacity: dim ? 0.55 : 1,
      fontFamily: "'Press Start 2P', monospace",
    }}>
      <div style={{
        position: 'absolute', top: 3, left: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
      }}>
        <span style={{ fontSize: 8, color, lineHeight: 1, letterSpacing: 0 }}>{card.rank}</span>
        <Suit id={card.suit} size={9} />
      </div>
      <div style={{
        position: 'absolute', bottom: 3, right: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
        transform: 'rotate(180deg)',
      }}>
        <span style={{ fontSize: 8, color, lineHeight: 1 }}>{card.rank}</span>
        <Suit id={card.suit} size={9} />
      </div>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Suit id={card.suit} size={26} />
      </div>
    </div>
  )
}

function CardBack() {
  return (
    <div style={{
      width: CARD_W, height: CARD_H,
      background: `repeating-linear-gradient(45deg, #4a7fa5 0 4px, #305878 4px 8px)`,
      boxShadow: 'inset -1px -1px #888, inset 1px 1px #fff, inset 0 0 0 3px #fdfdf5, 1px 1px 0 rgba(0,0,0,0.4)',
      border: '1px solid #000',
    }} />
  )
}

function EmptySlot({ children, onClick, glow }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: CARD_W, height: CARD_H,
        background: 'rgba(0,0,0,0.18)',
        boxShadow: glow
          ? 'inset 0 0 0 1px #ffe080, inset 0 0 0 2px rgba(0,0,0,0.4)'
          : 'inset 0 0 0 1px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)', fontSize: 18,
      }}
    >
      {children}
    </div>
  )
}

// ---------- game logic ----------
function makeDeck() {
  const deck = []
  for (const s of SUIT_IDS) for (const r of RANKS) deck.push({ suit: s, rank: r, id: `${s}-${r}` })
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

function deal() {
  const deck = makeDeck()
  const tableau = []
  let idx = 0
  for (let i = 0; i < 7; i++) {
    const faceDown = []
    for (let j = 0; j < i; j++) faceDown.push(deck[idx++])
    const faceUp = [deck[idx++]]
    tableau.push({ faceDown, faceUp })
  }
  return {
    stock: deck.slice(idx),
    waste: [],
    foundations: { bass: [], trout: [], lure: [], hook: [] },
    tableau,
    selected: null,
  }
}

function suitColor(id) { return SUIT_DEF[id].color }
function canStackTableau(child, parent) {
  if (!parent) return RANK_VALUE[child.rank] === 13
  return suitColor(child.suit) !== suitColor(parent.suit)
    && RANK_VALUE[child.rank] === RANK_VALUE[parent.rank] - 1
}
function canStackFoundation(card, pile, suitId) {
  if (card.suit !== suitId) return false
  if (pile.length === 0) return RANK_VALUE[card.rank] === 1
  return RANK_VALUE[card.rank] === RANK_VALUE[pile[pile.length - 1].rank] + 1
}
function isWon(s) {
  return SUIT_IDS.every(id => s.foundations[id].length === 13)
}

// ---------- solver ----------
function canonicalState(s) {
  const f = SUIT_IDS.map(id => id[0] + s.foundations[id].length).join('')
  const cols = s.tableau.map(c =>
    c.faceDown.map(x => x.id).join('-') + ':' + c.faceUp.map(x => x.id).join('-')
  ).sort().join('|')
  const sw = s.stock.map(x => x.id).join(',') + '/' + s.waste.map(x => x.id).join(',')
  return f + '#' + cols + '#' + sw
}

function generateSolverMoves(s) {
  const moves = []

  // 1. Tableau→Foundation (forced/safe priority)
  for (let ci = 0; ci < s.tableau.length; ci++) {
    const col = s.tableau[ci]
    if (col.faceUp.length === 0) continue
    const top = col.faceUp[col.faceUp.length - 1]
    if (canStackFoundation(top, s.foundations[top.suit], top.suit)) {
      moves.push({ kind: 't2f', col: ci })
    }
  }
  // 2. Waste→Foundation
  if (s.waste.length > 0) {
    const top = s.waste[s.waste.length - 1]
    if (canStackFoundation(top, s.foundations[top.suit], top.suit)) {
      moves.push({ kind: 'w2f' })
    }
  }
  // 3. Tableau→Tableau (move runs)
  for (let from = 0; from < s.tableau.length; from++) {
    const fc = s.tableau[from]
    if (fc.faceUp.length === 0) continue
    for (let idx = 0; idx < fc.faceUp.length; idx++) {
      const card = fc.faceUp[idx]
      const movingAll = idx === 0
      const fromHasFaceDown = fc.faceDown.length > 0
      for (let to = 0; to < s.tableau.length; to++) {
        if (from === to) continue
        const tc = s.tableau[to]
        const top = tc.faceUp[tc.faceUp.length - 1]
        if (top) {
          if (canStackTableau(card, top)) moves.push({ kind: 't2t', from, idx, to })
        } else if (tc.faceDown.length === 0) {
          // empty col: only K, and skip if it accomplishes nothing
          if (RANK_VALUE[card.rank] === 13) {
            // skip moving entire stack from a column that has no face-down (no progress)
            if (!(movingAll && !fromHasFaceDown)) {
              moves.push({ kind: 't2t', from, idx, to })
            }
          }
        }
      }
    }
  }
  // 4. Waste→Tableau
  if (s.waste.length > 0) {
    const top = s.waste[s.waste.length - 1]
    for (let to = 0; to < s.tableau.length; to++) {
      const tc = s.tableau[to]
      const tcTop = tc.faceUp[tc.faceUp.length - 1]
      if (tcTop) {
        if (canStackTableau(top, tcTop)) moves.push({ kind: 'w2t', to })
      } else if (tc.faceDown.length === 0 && RANK_VALUE[top.rank] === 13) {
        moves.push({ kind: 'w2t', to })
      }
    }
  }
  // 5. Foundation→Tableau (sometimes required to free a card)
  for (const suit of SUIT_IDS) {
    const f = s.foundations[suit]
    if (f.length === 0) continue
    const card = f[f.length - 1]
    for (let to = 0; to < s.tableau.length; to++) {
      const tc = s.tableau[to]
      const top = tc.faceUp[tc.faceUp.length - 1]
      if (top && canStackTableau(card, top)) moves.push({ kind: 'f2t', suit, to })
    }
  }
  // 6. Draw stock
  if (s.stock.length > 0 || s.waste.length > 0) {
    moves.push({ kind: 'draw' })
  }
  return moves
}

function applySolverMove(s, move) {
  const next = clone(s)
  if (move.kind === 't2f') {
    const col = next.tableau[move.col]
    const card = col.faceUp.pop()
    next.foundations[card.suit].push(card)
    if (col.faceUp.length === 0 && col.faceDown.length > 0) col.faceUp.push(col.faceDown.pop())
  } else if (move.kind === 'w2f') {
    const card = next.waste.pop()
    next.foundations[card.suit].push(card)
  } else if (move.kind === 't2t') {
    const fc = next.tableau[move.from]
    const moving = fc.faceUp.splice(move.idx)
    next.tableau[move.to].faceUp.push(...moving)
    if (fc.faceUp.length === 0 && fc.faceDown.length > 0) fc.faceUp.push(fc.faceDown.pop())
  } else if (move.kind === 'w2t') {
    const card = next.waste.pop()
    next.tableau[move.to].faceUp.push(card)
  } else if (move.kind === 'f2t') {
    const card = next.foundations[move.suit].pop()
    next.tableau[move.to].faceUp.push(card)
  } else if (move.kind === 'draw') {
    if (next.stock.length === 0) {
      next.stock = [...next.waste].reverse()
      next.waste = []
    } else {
      const n = Math.min(3, next.stock.length)
      const drawn = next.stock.splice(next.stock.length - n, n)
      next.waste.push(...drawn)
    }
  }
  return next
}

// Iterative DFS with memoization. Returns true / false / null (budget exceeded).
function solve(initial, budget = 40000) {
  const visited = new Set()
  const stack = [{ state: initial, idx: 0, moves: null }]
  let nodes = 0
  while (stack.length > 0) {
    if (++nodes > budget) return null
    const frame = stack[stack.length - 1]
    if (frame.moves === null) {
      if (isWon(frame.state)) return true
      const h = canonicalState(frame.state)
      if (visited.has(h)) { stack.pop(); continue }
      visited.add(h)
      frame.moves = generateSolverMoves(frame.state)
    }
    if (frame.idx >= frame.moves.length) { stack.pop(); continue }
    const m = frame.moves[frame.idx++]
    stack.push({ state: applySolverMove(frame.state, m), idx: 0, moves: null })
  }
  return false
}

function dealWinnable(maxAttempts = 40) {
  let last = null
  for (let i = 0; i < maxAttempts; i++) {
    const d = deal()
    if (solve(d) === true) return d
    last = d
  }
  return last // should never reach with reasonable budget
}

function clone(s) {
  return {
    stock: [...s.stock],
    waste: [...s.waste],
    foundations: {
      bass:  [...s.foundations.bass],
      trout: [...s.foundations.trout],
      lure:  [...s.foundations.lure],
      hook:  [...s.foundations.hook],
    },
    tableau: s.tableau.map(c => ({ faceDown: [...c.faceDown], faceUp: [...c.faceUp] })),
    selected: s.selected,
  }
}

function removeFromSource(s, source, count) {
  if (source.kind === 'waste') s.waste.pop()
  else if (source.kind === 'foundation') s.foundations[source.suit].pop()
  else if (source.kind === 'tableau') {
    const col = s.tableau[source.col]
    col.faceUp.splice(col.faceUp.length - count, count)
    if (col.faceUp.length === 0 && col.faceDown.length > 0) {
      col.faceUp.push(col.faceDown.pop())
    }
  }
}

// ---------- component ----------
export default function KlondikeWindow() {
  const [state, setState] = useState(null)
  const [dealing, setDealing] = useState(true)
  const historyRef = useRef([])
  const won = useMemo(() => state ? isWon(state) : false, [state])

  // initial deal — yield to UI, then crunch a winnable layout
  useEffect(() => { newGame() }, [])  // eslint-disable-line

  const newGame = useCallback(() => {
    setDealing(true)
    historyRef.current = []
    setTimeout(() => {
      const d = dealWinnable()
      setState(d)
      setDealing(false)
    }, 30)
  }, [])

  const pushHistory = useCallback((prev) => {
    const h = historyRef.current
    h.push(prev)
    if (h.length > 80) h.shift()
  }, [])

  const undo = useCallback(() => {
    setState(s => {
      const h = historyRef.current
      if (h.length === 0) return s
      const prev = h.pop()
      return { ...prev, selected: null }
    })
  }, [])

  const drawStock = useCallback(() => {
    setState(s => {
      pushHistory(s)
      const next = clone(s)
      next.selected = null
      if (next.stock.length === 0) {
        next.stock = [...next.waste].reverse()
        next.waste = []
        return next
      }
      const n = Math.min(3, next.stock.length)
      const drawn = next.stock.splice(next.stock.length - n, n)
      next.waste.push(...drawn)
      return next
    })
  }, [pushHistory])

  const tryAutoFoundation = useCallback((source, card) => {
    setState(s => {
      const f = s.foundations[card.suit]
      if (!canStackFoundation(card, f, card.suit)) return s
      pushHistory(s)
      const next = clone(s)
      removeFromSource(next, source, 1)
      next.foundations[card.suit].push(card)
      next.selected = null
      return next
    })
  }, [pushHistory])

  const handlePick = useCallback((source) => {
    setState(s => {
      const next = clone(s)
      let cards
      if (source.kind === 'waste') {
        if (s.waste.length === 0) return s
        cards = [s.waste[s.waste.length - 1]]
      } else if (source.kind === 'foundation') {
        const f = s.foundations[source.suit]
        if (f.length === 0) return s
        cards = [f[f.length - 1]]
      } else {
        const col = s.tableau[source.col]
        cards = col.faceUp.slice(source.idx)
        if (cards.length === 0) return s
      }
      // toggle deselect
      if (s.selected && JSON.stringify(s.selected.source) === JSON.stringify(source)) {
        next.selected = null
        return next
      }
      next.selected = { source, cards }
      return next
    })
  }, [])

  const handleDrop = useCallback((target) => {
    setState(s => {
      if (!s.selected) return s
      const { source, cards } = s.selected
      // Foundation: only one card
      if (target.kind === 'foundation') {
        if (cards.length !== 1) return { ...s, selected: null }
        if (!canStackFoundation(cards[0], s.foundations[target.suit], target.suit)) {
          return { ...s, selected: null }
        }
        pushHistory(s)
        const next = clone(s)
        removeFromSource(next, source, 1)
        next.foundations[target.suit].push(cards[0])
        next.selected = null
        return next
      }
      if (target.kind === 'tableau') {
        const col = s.tableau[target.col]
        const top = col.faceUp[col.faceUp.length - 1]
        if (!canStackTableau(cards[0], top)) return { ...s, selected: null }
        pushHistory(s)
        const next = clone(s)
        removeFromSource(next, source, cards.length)
        next.tableau[target.col].faceUp.push(...cards)
        next.selected = null
        return next
      }
      return s
    })
  }, [pushHistory])

  const isSelected = (source) => {
    if (!state.selected) return false
    return JSON.stringify(state.selected.source) === JSON.stringify(source)
  }
  const isHighlighted = (source) => {
    if (!state.selected) return false
    if (state.selected.source.kind !== 'tableau' || source.kind !== 'tableau') return false
    if (state.selected.source.col !== source.col) return false
    return source.idx >= state.selected.source.idx
  }

  if (!state || dealing) {
    return (
      <div style={{
        background: `linear-gradient(180deg, ${FELT} 0%, ${FELT_DARK} 100%)`,
        padding: 12, minHeight: 540,
        boxShadow: 'inset 0 0 24px rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Press Start 2P', monospace",
        color: '#fdfdf5', fontSize: 9, letterSpacing: 2,
      }}>
        Dealing a winnable hand...
      </div>
    )
  }

  return (
    <div style={{
      background: `linear-gradient(180deg, ${FELT} 0%, ${FELT_DARK} 100%)`,
      padding: 12,
      display: 'flex', flexDirection: 'column', gap: 14,
      boxShadow: 'inset 0 0 24px rgba(0,0,0,0.45)',
      minHeight: 540,
      fontFamily: "'Press Start 2P', monospace",
    }}>
      {/* Top row: stock+waste + foundations */}
      <div style={{ display: 'flex', gap: CARD_GAP, alignItems: 'flex-start' }}>
        {/* Stock */}
        <div onClick={drawStock} style={{ cursor: 'pointer' }}>
          {state.stock.length > 0 ? <CardBack /> : (
            <EmptySlot>
              <span style={{ fontSize: 18 }}>↻</span>
            </EmptySlot>
          )}
        </div>
        {/* Waste — fan top 3 */}
        <div style={{
          width: CARD_W + 28,
          height: CARD_H,
          position: 'relative',
        }}>
          {state.waste.slice(-3).map((card, i, arr) => {
            const isTop = i === arr.length - 1
            const offset = i * 14
            return (
              <div
                key={card.id}
                onClick={isTop ? () => handlePick({ kind: 'waste' }) : undefined}
                onDoubleClick={isTop ? () => tryAutoFoundation({ kind: 'waste' }, card) : undefined}
                style={{
                  position: 'absolute',
                  top: 0, left: offset,
                  cursor: isTop ? 'pointer' : 'default',
                  outline: isTop && isSelected({ kind: 'waste' }) ? '2px solid #ffe080' : 'none',
                  outlineOffset: 1,
                }}
              >
                <CardFace card={card} />
              </div>
            )
          })}
          {state.waste.length === 0 && <EmptySlot />}
        </div>

        <div style={{ flex: 1 }} />

        {/* Foundations */}
        <div style={{ display: 'flex', gap: CARD_GAP }}>
          {SUIT_IDS.map(suit => {
            const pile = state.foundations[suit]
            const top = pile[pile.length - 1]
            return (
              <div
                key={suit}
                onClick={() => state.selected ? handleDrop({ kind: 'foundation', suit }) : (top && handlePick({ kind: 'foundation', suit }))}
                style={{ cursor: 'pointer' }}
              >
                {top ? (
                  <div style={{
                    outline: isSelected({ kind: 'foundation', suit }) ? '2px solid #ffe080' : 'none',
                    outlineOffset: 1,
                  }}>
                    <CardFace card={top} />
                  </div>
                ) : (
                  <EmptySlot glow={!!state.selected}>
                    <Suit id={suit} size={20} />
                  </EmptySlot>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Tableau */}
      <div style={{ display: 'flex', gap: CARD_GAP, alignItems: 'flex-start' }}>
        {state.tableau.map((col, ci) => {
          const totalCards = col.faceDown.length + col.faceUp.length
          const colHeight = CARD_H + col.faceDown.length * FAN_DOWN_FACEDOWN
            + Math.max(0, col.faceUp.length - 1) * FAN_DOWN
          return (
            <div
              key={ci}
              style={{ position: 'relative', width: CARD_W, minHeight: CARD_H }}
              onClick={() => col.faceUp.length === 0 && col.faceDown.length === 0 && state.selected
                ? handleDrop({ kind: 'tableau', col: ci })
                : undefined}
            >
              {totalCards === 0 && <EmptySlot glow={!!state.selected} />}
              {col.faceDown.map((c, i) => (
                <div key={`fd-${i}`} style={{ position: 'absolute', top: i * FAN_DOWN_FACEDOWN, left: 0 }}>
                  <CardBack />
                </div>
              ))}
              {col.faceUp.map((c, i) => {
                const top = i * FAN_DOWN + col.faceDown.length * FAN_DOWN_FACEDOWN
                const isTop = i === col.faceUp.length - 1
                const source = { kind: 'tableau', col: ci, idx: i }
                return (
                  <div
                    key={c.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (state.selected && !isHighlighted(source)) handleDrop({ kind: 'tableau', col: ci })
                      else handlePick(source)
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      if (isTop) tryAutoFoundation(source, c)
                    }}
                    style={{
                      position: 'absolute',
                      top,
                      left: 0,
                      cursor: 'pointer',
                      outline: isHighlighted(source) ? '2px solid #ffe080' : 'none',
                      outlineOffset: 1,
                    }}
                  >
                    <CardFace card={c} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Footer / controls */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 12, marginTop: 'auto', paddingTop: 8,
      }}>
        <div style={{ fontSize: 7, color: '#fdfdf5cc', letterSpacing: 1 }}>
          {won
            ? '★ YOU LANDED THEM ALL ★'
            : 'Click stock to draw 3 · Click card to select · Double-click → foundation'}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={undo}
            style={{
              padding: '5px 10px',
              background: '#c0c0c0',
              boxShadow: 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
              border: 'none', cursor: 'pointer',
              fontSize: 7, fontFamily: "'Press Start 2P', monospace",
              color: '#000', letterSpacing: 1,
            }}
          >
            ↶ Undo
          </button>
          <button
            onClick={newGame}
            style={{
              padding: '5px 10px',
              background: '#c0c0c0',
              boxShadow: 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
              border: 'none', cursor: 'pointer',
              fontSize: 7, fontFamily: "'Press Start 2P', monospace",
              color: '#000', letterSpacing: 1,
            }}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}
