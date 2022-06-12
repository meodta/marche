import React, {useEffect, useMemo, useRef, useState} from 'react'
import { ReactSVG } from 'react-svg'
import './map.css'
import * as $ from './styles'

interface IMap {
  activeStates?: string[]
}

const getClassList = (svg: SVGSVGElement, state: string) => svg.querySelector(`path.${state}`)?.classList

const Map: React.FC<IMap> = ({ activeStates }) => {
  const [svg, setSVG] = useState<SVGSVGElement>()
  const previousStates = useRef<string[]>([])

  useEffect(() => {
    if (!svg || !activeStates) return
    previousStates.current.forEach(state => {
      getClassList(svg, state)?.add('nonactive')
    })
    previousStates.current = activeStates
    activeStates.forEach(state => {
      const list = getClassList(svg, state)
      list?.add('active')
      list?.remove('nonactive')
    })
  }, [activeStates, svg])

  const SVG = useMemo(() => <ReactSVG src={'map.svg'} wrapper={'svg'} width={'800px'} viewBox={'0 0 1073 585'} afterInjection={(error, svg) => setSVG(svg)} />, [])

  return <$.MapContainer>{SVG}</$.MapContainer>
}

export default Map
