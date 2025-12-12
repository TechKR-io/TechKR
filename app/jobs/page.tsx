'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { jobsApi } from '@/lib/api'
import { Job } from '@/types'
import { Search, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react'

export default function JobsPage() {
    const [jobs, sestJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [fileterStatus, setFilterStatus] = useState<string>('OPEN')

    useEffect(() => {
        fetchJobs()
    }, [fileterStatus])

    const fetchJobs = async () => {
        try {
            const response = await jobsApi.getAll({ status: fileterStatus })
            sestJobs(response.data)
        } catch (error) {
            console.error('Failed to fetch jobs:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-2xl font-bold">Tech</span>
                <span className="text-2xl font-bold bg-orange-500 px-2 rounded">
                  KR
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/jobs" className="text-blue-600 font-medium">
                Find Jobs
              </Link>
              <Link href="/client/post-job">
                <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                  Post a Job
                </button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-4">
              Find a job and showcase your skills
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Browse through thousands of opportunities
            </p>

            {/* Search Bar */}
            <div className="flex gap-4 max-w-3xl">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search Applied Job"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex gap-4 mb-8">
            {["OPEN", "IN_PROGRESS", "COMPLETED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  fileterStatus === status
                    ? "bg-blue-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No jobs found</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <p className="text-gray-600">
                            {job.client.companyName || job.client.name} • {job.client.country}
                          </p>
                        </div>
                      </div>

                      <p className='text-gray-700 mb-4 line-clamp-2'>{job.description}</p>

                      <div className='flex flex-wrap gap-2 mb-4'>
                        {job.requiredSkills.map(skill => (
                            <span
                                key={skill}
                                className='px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium'>
                                    {skill}
                                </span>
                        ))}
                      </div>

                      <div className='flex items-center gap-6 text-sm text-gray-600'>
                        <div className='flex items-center gap-2'>
                            <DollarSign size={16} />
                            <span>${job.hourlyRate}/hour</span>
                        </div>
                        {job.estimatedHours && (
                            <div className='flex items-center gap-2'>
                                <Clock size={16} />
                                <span>{job.estimatedHours} hours</span>
                            </div>
                        )}
                        <div className='flex items-center gap-2'>
                            <MapPin size={16} />
                            <span>{job.client.country}</span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/jobs/${job.id}`}>
                        <button className='px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800'>
                            View Details
                        </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}