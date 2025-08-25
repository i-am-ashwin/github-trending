import { render, screen } from '@testing-library/react'
import RepoCard from '../RepoCard'
import { Repository } from '@/types/repository'
export const createMockRepository = (overrides: Partial<Repository> = {}): Repository => ({
  id: '1',
  name: 'test-repo',
  description: 'A test repository',
  language: 'JavaScript',
  stargazersCount: 100,
  forksCount: 20,
  private: false,
  updatedAt: '2 days ago',
  owner: {
    login: 'testuser',
    avatar_url: 'https://github.com/testuser.png',
  },
  html_url: 'https://github.com/testuser/test-repo',
  ...overrides,
})
jest.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, className, onClick }: any) => (
      <div className={className} onClick={onClick}>{children}</div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, className, onClick }: any) => (
      <button className={className} onClick={onClick}>{children}</button>
    ),
  },
}))

describe('RepoCard', () => {
  const mockToggleStar = jest.fn()
  const defaultProps = {
    repo: createMockRepository(),
    isStarred: false,
    onToggleStar: mockToggleStar,
    index: 0,
  }

  beforeEach(() => {
    mockToggleStar.mockClear()
  })

  it('displays owner avatar with correct alt text', () => {
    const repo = createMockRepository({
      owner: {
        login: 'testowner',
        avatar_url: 'https://avatar.example.com/testowner',
      },
    })
    render(<RepoCard {...defaultProps} repo={repo} />)
    const avatar = screen.getByAltText('testowner')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://avatar.example.com/testowner')
  })

  it('displays external link to repository', () => {
    const repo = createMockRepository({
      name: 'test-repo',
      html_url: 'https://github.com/user/test-repo',
    })

    render(<RepoCard {...defaultProps} repo={repo} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://github.com/user/test-repo')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('displays updated time correctly', () => {
    const repo = createMockRepository({ updatedAt: '3 hours ago' })

    render(<RepoCard {...defaultProps} repo={repo} />)

    expect(screen.getByText('Updated 3 hours ago')).toBeInTheDocument()
  })

  it('handles repository without language', () => {
    const repo = createMockRepository({ language: '' })

    render(<RepoCard {...defaultProps} repo={repo} />)

    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument()
  })

  it('displays different programming languages correctly', () => {
    const languages = ['Python', 'Java', 'Go', 'Rust', 'Swift']

    languages.forEach((language) => {
      const repo = createMockRepository({ language })
      const { unmount } = render(<RepoCard {...defaultProps} repo={repo} />)

      expect(screen.getByText(language)).toBeInTheDocument()
      unmount()
    })
  })

  it('shows correct star count formatting', () => {
    const testCases = [
      { count: 0, expected: '0' },
      { count: 1234, expected: '1234' },
    ]

    testCases.forEach(({ count, expected }) => {
      const repo = createMockRepository({ stargazersCount: count })
      const { unmount } = render(<RepoCard {...defaultProps} repo={repo} />)

      expect(screen.getByText(expected)).toBeInTheDocument()
      unmount()
    })
  })

  it('handles empty description', () => {
    const repo = createMockRepository({ description: '' })

    render(<RepoCard {...defaultProps} repo={repo} />)

    const descriptionElement = screen.getByText('', { selector: 'p' })
    expect(descriptionElement).toBeInTheDocument()
  })
})
