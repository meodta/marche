import React, {useEffect, useMemo, useState} from 'react'
import * as $ from './styles'
import Map from 'components/Map'
import {API} from 'helpers/api.helper'
import { Visit } from 'types/visit.type'
import Select from 'react-select'

const DROPDOWN_STEPS = [0, 250, 500, 1000]

const getIndexFromVisitsCount = (value: number) => DROPDOWN_STEPS.findIndex((v, index, array) => array.length === index + 1 || value < array[index + 1])

type DropdownOption = {
  label: string
  value: string[]
}

const MainView: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>()
  const [activeStates, setActiveStates] = useState<string[]>()

  const visitsByState = useMemo(() => {
    if (!visits) return
    return visits.reduce((prev, curr) => ({ ...prev, [curr.id]: (prev[curr.id] ?? 0 ) + curr.visits}), {} as Record<string,number>)
  }, [visits])
  const statesAsOptions = useMemo(() => {
    if (!visitsByState) return
    const options = DROPDOWN_STEPS.reduce(
      (prev, curr, index, array) => ({ ...prev, [index]: { label: index === array.length - 1 ? `${curr}+` : `${curr}-${array[index+1]}`, value: [] }}), {} as Record<number, DropdownOption>)
    Object.entries(visitsByState).forEach(([state, visitsCount]) => {
      options[getIndexFromVisitsCount(visitsCount)].value.push(state.toLowerCase())
    })
    return Object.values(options)
  }, [visitsByState])

  useEffect(() => {
    fetchVisits()
  }, [])

  const fetchVisits = async () => {
    const response = await fetch(`${API}/data`)
    setVisits(await response.json())
  }

  const onSelectChange = (newValue: string[] | undefined) => {
    setActiveStates(newValue ?? [])
  }

  return <$.MainViewContainer>
    <$.ControlsContainer>
      <$.Label>User visits</$.Label>
      <$.SelectWrapper>
        <Select options={statesAsOptions} onChange={(v) => onSelectChange(v?.value)} isClearable/>
      </$.SelectWrapper>
    </$.ControlsContainer>
    <Map activeStates={activeStates}/>
  </$.MainViewContainer>
}

export default MainView
