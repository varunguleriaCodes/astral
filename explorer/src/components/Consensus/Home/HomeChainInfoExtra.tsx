import { Spinner } from '@/components/common/Spinner'
import useMediaQuery from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'
import type { HomeQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { FC, useMemo } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { HomeInfoCard } from './HomeInfoCard'

type Props = {
  data: HomeQuery | undefined
  loading: boolean
}

export const HomeChainInfoExtra: FC<Props> = ({ data, loading }) => {
  const { tokenSymbol } = useIndexers()

  const isDesktop = useMediaQuery('(min-width: 1536px)')

  const eventsCount = data
    ? numberWithCommas(Number(data.consensus_blocks[0].cumulative?.cumulative_events_count))
    : 'error'
  const transfersCount = data
    ? numberWithCommas(Number(data.consensus_blocks[0].cumulative?.cumulative_transfers_count))
    : 'error'
  const transferValue = data
    ? numberWithCommas(
        bigNumberToNumber(data.consensus_blocks[0].cumulative?.cumulative_transfer_value),
      ) + ` ${tokenSymbol}`
    : 'error'
  const rewardsCount = data
    ? numberWithCommas(Number(data.consensus_blocks[0].cumulative?.cumulative_rewards_count))
    : 'error'
  const rewardsValue = data
    ? numberWithCommas(
        bigNumberToNumber(data.consensus_blocks[0].cumulative?.cumulative_reward_value),
      ) + ` ${tokenSymbol}`
    : 'error'

  const listOfCards = useMemo(
    () => [
      {
        title: 'Total Events',
        value: eventsCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Transfers',
        value: transfersCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Transfers Value',
        value: transferValue,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Rewards',
        value: rewardsCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Rewards Value',
        value: rewardsValue,
        darkBgClass: 'dark:bg-boxDark',
      },
    ],
    [eventsCount, transfersCount, transferValue, rewardsCount, rewardsValue],
  )

  return (
    <>
      {!data || loading ? (
        <Spinner isXSmall />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className}" style="background-color: #1949D2;"></span>`,
          }}
          breakpoints={{
            460: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          className={cn('flex w-full items-center gap-5', isDesktop ? '!p-0' : '!pb-10')}
        >
          {listOfCards.map(({ title, value, darkBgClass }, index) => (
            <SwiperSlide key={`${title}-${index}`}>
              <HomeInfoCard
                key={`${title}-${index}`}
                title={title}
                value={value}
                darkBgClass={darkBgClass}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}
