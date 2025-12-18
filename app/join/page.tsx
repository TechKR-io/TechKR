"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, User } from "lucide-react";

export default function JoinPage() {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<'client' | 'talent' | null>(null)

    const handleCreateAccount = () => {
        if (selectedType === 'client') {
            router.push('/register/client')
        } else if (selectedType === 'talent') {
            router.push('/register/talent')
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-pink-900/60 backdrop:backdrop-blur-sm" />
                </div>

                {/* Content */}
                <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                    <div className="bg-white/25 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
                        {/* Logo */}
                        <div className="flex items-center justify-center mb-8">
                            <span className="text-4xl font-bold">Tech</span>
                            <span className="text-4xl font-bold bg-orange-500 px-2 rounded">KR</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold text-center mb-3" style={{ color: '#0000FF' }}>
                            Join as a client or talent
                        </h1>
                        <p className="text-center text-gray-600 mb-10">
                            Choose the account type that best fits you, hire skilled Nigerian talent or offer your skills globally.
                        </p>

                        {/* Options */}
                        <div className="space-y-4 mb-8">
                            {/* Client Option */}
                            <button
                                onClick={() => setSelectedType('client')}
                                className={`w-full p-6 rounded-xl border-2 transition-all ${
                                    selectedType === 'client'
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <Briefcase className={selectedType === 'client' ? 'text-blue-600' : 'text-gray-400'} size={24} />
                                        </div>
                                        <div className="text-left flex-1">
                                            <h3 className="font-bold text-lg mb-1">I&apos;m a client, hiring for a project</h3>
                                            <p className="text-sm text-gray-600">
                                                Global hire talented Nigerian professionals for your projects.
                                            </p>
                                        </div>
                                        <input
                                            type="radio"
                                            checked={selectedType === 'client'}
                                            onChange={() => setSelectedType('client')}
                                            className="mt-1"
                                        />
                                    </div>
                                </button>

                                {/* Talent Option */}
                                <button
                                    onClick={() => setSelectedType('talent')}
                                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                                        selectedType === 'talent'
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <User className={selectedType === 'talent' ? 'text-blue-600' : 'text-gray-400'} size={24} />
                                        </div>
                                        <div className="text-left flex-1">
                                            <h3 className="font-bold text-lg mb-1">I&apos;m a talent, looking for job</h3>
                                            <p className="text-sm text-gray-600">
                                                Target: Nigerians only, create a Talent profile to showcase skills.
                                            </p>
                                        </div>
                                        <input
                                            type="radio"
                                            checked={selectedType === 'talent'}
                                            onChange={() => setSelectedType('talent')}
                                            className="mt-1"
                                        />
                                        
                                    </div>
                                </button>
                        </div>

                        {/* Create Account Button */}
                        <button
                            onClick={handleCreateAccount}
                            disabled={!selectedType}
                            className="w-full py-4 bg-blue-900 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Create Account
                        </button>

                        {/* Login Link */}
                        <p className="text-center mt-6 text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 hover:underline font-medium">
                                Login
                            </Link>
                        </p>

                        {/* Terms */}
                        <p className="text-center text-xs text-gray-500 mt-6">
                            By creating an account you agree to our{' '}
                            <Link href="/terms" className="text-blue-600 hover:underline">
                                Terms
                            </Link>
                            {' '}and{' '}
                            <Link href="/privacy" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
        </div>
    )
}