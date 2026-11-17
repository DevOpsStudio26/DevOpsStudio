import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CircuitBoard } from 'lucide-react'
import { InfinityMark } from './InfinityDivider'

// `infinity` swaps the image for the glowing Infinity Loop mark (the navbar uses it).
export default function Logo({ small = false, infinity = false }) {
  const [failed, setFailed] = useState(false)
  const box = small ? 'size-6' : 'size-8'

  return (
    <Link to="/" className="flex items-center gap-2.5">
      {infinity ? (
        <InfinityMark className={small ? 'size-7' : 'size-9'} iconClassName={small ? 'size-4' : 'size-5'} />
      ) : failed ? (
        <span className={`${box} flex items-center justify-center rounded-md bg-linear-135 from-brand to-violet text-white`}>
          <CircuitBoard className={small ? 'size-3.5' : 'size-4.5'} />
        </span>
      ) : (
        <img src="/images/logo.png" alt="" className={`${box} rounded-md object-cover`} onError={() => setFailed(true)} />
      )}
      <span className={`font-semibold text-fg ${small ? 'text-lg' : 'text-xl'}`}>DevOps Studio</span>
    </Link>
  )
}
