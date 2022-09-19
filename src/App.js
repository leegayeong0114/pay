import { useState } from 'react'

const App = () => {

  const [startDate, setStartDate] = useState('') // 입사일
  const [endDate, setEndDate] = useState('') // 퇴사일
  const [totalDate, setTotalDate] = useState(0) // 재직 일수

  const [totalThreeMonthPay, setTotalThreMonthPay] = useState(0) // 3개월 급여 총액
  const [totalBonus, setTotalBonus] = useState(0) // 연간 상여금 총액
  const [annuelAllowance, setAnnuelAllowance] = useState(0) // 연차수당
  
  const [averageDailyWage, setAverageDailyWage] = useState(0) // 1일 평균 임금
  const [serverancePay, setServerancePay] = useState(0) // 퇴직금

  const total = () => {
    // 1일 평균임금 = 3개월간의 임금 / 3개월간의 총 일수
    // 퇴직금 = 1일 평균임금 * 30일 * 재직일수 / 365
    // 근속일수 1년이상 체크, 입사일 < 퇴직일 

    // 재직 일수
    const fStartDt = new Date(startDate)
    const fEndDt = new Date(endDate)
    const diffDt = fStartDt.getTime() - fEndDt.getTime()

    setTotalDate(Math.abs(diffDt / (1000 * 60 * 60 * 24)))
    setAverageDailyWage(Math.floor((totalThreeMonthPay + totalBonus + annuelAllowance) / 91)) // 91 신경써주기
    setServerancePay(Math.floor((averageDailyWage * 30 * totalDate) / 365))
  }

  const init = () => {
    setTotalThreMonthPay(0)
    setTotalBonus(0)
    setAnnuelAllowance(0)
    setServerancePay(0)
  }

  return (
    <div className="App">
      <p>
        입사일 : <input type={'date'} onChange={(e) => setStartDate(e.target.value)}/>
        퇴사일 : <input type={'date'} onChange={(e) => setEndDate(e.target.value)}/>
      </p>
      <p>
        3개월 급여 총액 : <input type={'text'} value={totalThreeMonthPay} onChange={(e) => setTotalThreMonthPay(parseInt(e.target.value), 10)}/>
      </p>
      <p>
        연간 상여금 총액 : <input type={'text'} value={totalBonus} onChange={(e) => setTotalBonus(parseInt(e.target.value), 10)}/>
      </p>
      <p>
        연차수당 : <input type={'text'} value={annuelAllowance} onChange={(e) => setAnnuelAllowance(parseInt(e.target.value), 10)}/>
      </p>
      <p>
        <button type={'button'} onClick={init}>초기화</button>
        <button type={'button'} onClick={total}>계산하기</button>
      </p>
      <p>---------------------------------------------------------</p>
      <p>재직일수 : {totalDate}일</p>
      <p>1일 평균임금 : {averageDailyWage}원</p>
      <p>예상퇴직금 (세전기준)  : {serverancePay}원</p> 
    </div>
  )
}

export default App