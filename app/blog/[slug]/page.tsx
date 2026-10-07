import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Footer, Header } from '@/components/site'
import { ImagePlaceholder, LargeCTA } from '@/components/editorial'
import { posts } from '@/data/content'
export function generateStaticParams(){return posts.map(post=>({slug:post.slug}))}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=posts.find(item=>item.slug===slug);if(!post)notFound();const related=posts.filter(item=>item.slug!==slug).slice(0,2);return <><Header/><main className="internal-page article-page"><section className="article-hero"><p className="eyebrow">{post.category} / {post.date} / {post.read}</p><h1>{post.title}</h1><p>{post.excerpt}</p><ImagePlaceholder label="Article hero" caption="Replace with Swan imagery" aspect="wide"/></section><article className="article-body">{post.content.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article><section className="related-articles"><p className="eyebrow">Continue reading</p>{related.map(item=><Link href={`/blog/${item.slug}`} key={item.slug}><span>{item.title}</span><ArrowUpRight size={16}/></Link>)}</section><LargeCTA eyebrow="From the Swan journal" title={<>Make the next idea <em>visible.</em></>}/></main><Footer/></>}
