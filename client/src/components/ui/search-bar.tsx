import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  author?: string | null;
}

interface SearchBarProps {
  blogPosts: BlogPost[];
  onSearch: (query: string) => void;
  onSelectPost: (slug: string) => void;
}

export function SearchBar({ blogPosts, onSearch, onSelectPost }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<BlogPost[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = blogPosts
        .filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase())) ||
          (post.author && post.author.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, blogPosts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setIsOpen(false);
  };

  const handleSelectPost = (slug: string) => {
    setIsOpen(false);
    onSelectPost(slug);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          className="pl-10 pr-20 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 focus:border-white/40"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {query && (
            <Button
              onClick={clearSearch}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={() => handleSearch(query)}
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-white/70 hover:text-white hover:bg-white/10"
          >
            Search
          </Button>
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((post) => (
            <button
              key={post.id}
              onClick={() => handleSelectPost(post.slug)}
              className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-600 last:border-b-0 transition-colors"
            >
              <h4 className="font-medium text-slate-900 dark:text-white mb-1 line-clamp-1">
                {post.title}
              </h4>
              {post.excerpt && (
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              {post.author && (
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  By {post.author}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}