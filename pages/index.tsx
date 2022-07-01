import moment from 'moment-timezone'
import { useState } from 'react'

const FORMAT = 'MM/DD/YYYY HH:mm:ss'

function parseDates(start: string, end: string) {
  const today = moment(moment(start).tz('America/New_York').toDate()).tz(
    'America/New_York'
  )
  const endDate = moment(`${end}T00:00:00.000Z`).tz('America/New_York').utc()
  const duration = moment.duration(endDate.diff(today))
  const days = duration.asDays()
  const daysToExpire =
    days < 0 ? 0 : days > 0 && days < 1 ? 1 : Math.floor(days)
  const isExpired = days < 0 ? true : days === 0
  return {
    todayFormated: today.format(FORMAT),
    endDateFormated: endDate.format(FORMAT),
    days,
    daysToExpire,
    isExpired
  }
}

export default function IndexPage() {
  const [startDate, setStartDate] = useState('2022-07-01')
  const [endDate, setEndDate] = useState('2022-08-30')
  const dates = parseDates(startDate, endDate)
  return (
    <div className='w-screen h-screen bg-gray-200'>
      <main role='main' className='w-full py-12'>
        <div className='container mx-auto'>
          <div className='w-full text-center mb-6'>
            <h1 className='text-5xl font-bold'>HELLO</h1>
          </div>
          <div className='w-full flex flex-col items-center'>
            <div className='w-2/12'>
              <div className='w-full mb-2'>
                <label htmlFor='start-date' className='w-full font-semibold'>
                  Select the start date
                </label>
                <input
                  type='date'
                  id='start-date'
                  name='start-date'
                  className='w-full mt-2'
                  pattern='\d{1,2}/\d{1,2}/\d{4}'
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>
              <div className='w-full mb-4'>
                <span className='mr-2 font-bold'>START:</span>
                <span>{startDate}</span>
              </div>
              <div className='w-full mb-2'>
                <label htmlFor='end-date' className='w-full font-semibold'>
                  Select the end date
                </label>
                <input
                  id='end-date'
                  name='end-date'
                  type='date'
                  className='w-full mt-2'
                  pattern='\d{1,2}/\d{1,2}/\d{4}'
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>
              <div className='w-full mb-6'>
                <span className='mr-2 font-bold'>END:</span>
                <span>{endDate}</span>
              </div>
            </div>

            <div className='w-4/12'>
              <div className='w-full text-center'>
                <h2 className='text-lg font-bold mb-2'>RESULT:</h2>
                <p>
                  <strong>Today:</strong> {dates.todayFormated}
                </p>
                <p>
                  <strong>Expires On:</strong> {dates.endDateFormated}
                </p>
                <p>
                  <strong>Days left:</strong> {dates.days}
                </p>
                <p>
                  <strong>Days to expire:</strong> {dates.daysToExpire}
                </p>
                <p>
                  <strong>Is Expired</strong> {dates.isExpired.toString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
