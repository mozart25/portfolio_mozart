// import { CheckIcon } from '@heroicons/react/outline'
import { FcOk } from "react-icons/fc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

const tiers = [
    {
        id: 1,
        name: '기본',
        href: '/about',
        priceMonthly: 0,
        description: '프로필을 확인 할 수 있습니다.',
        features: ['프로필 확인']
    },
    {
        id: 2,
        name: '고급',
        href: '/tutorials',
        priceMonthly: '회원가입',
        description: '프로필과 프로젝트를 확인할 수 있습니다.',
        features: [
            '프로필 확인',
            '프로젝트 확인',
        ]
    },
    {
        id: 3,
        name: '관리자',
        href: '#',
        priceMonthly: '???',
        description: '프로필과 프로젝트 그리고 취미를 확인할 수 있습니다.',
        features: [
            '프로필 확인',
            '프로젝트 확인 및 수정',
            '취미 확인',
        ]
    }
]



const Main = () => {

    return (
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
            {tiers.map((tier) => (
                <div key={tier.name} className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                    <div className="p-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
                        <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                        <p className="mt-8">
                            <span className="text-4xl font-extrabold text-gray-900">${tier.priceMonthly}</span>{' '}
                            <span className="text-base font-medium text-gray-500">/click </span>
                        </p>
                        {/* <a
                            href={tier.href}
                            className="mt-8 block w-full bg-purple-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-purple-700"
                        >
                            Buy {tier.name}
                        </a> */}
                        <Link
                            className="mt-8 block w-full bg-purple-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-purple-700"
                            to={tier.href}
                        >
                            Buy {tier.name}
                        </Link>
                    </div>
                    <div className="pt-6 pb-8 px-6">
                        <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                        <ul className="mt-6 space-y-4">
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex space-x-3">
                                    <FcOk />
                                    <span className="text-sm text-gray-500">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Main;
