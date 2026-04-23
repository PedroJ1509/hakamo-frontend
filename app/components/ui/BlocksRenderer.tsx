interface TextNode {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
}

interface BlockNode {
  type: string
  format?: string
  level?: number
  indentLevel?: number
  children?: (TextNode | BlockNode)[]
  url?: string
}

function renderText(node: TextNode): React.ReactNode {
  let content: React.ReactNode = node.text
  if (node.bold) content = <strong>{content}</strong>
  if (node.italic) content = <em>{content}</em>
  if (node.underline) content = <u>{content}</u>
  if (node.strikethrough) content = <s>{content}</s>
  return content
}

function renderNode(node: BlockNode | TextNode, index: number): React.ReactNode {
  if (node.type === 'text') return <span key={index}>{renderText(node as TextNode)}</span>

  const block = node as BlockNode
  const children = block.children?.map((child, i) => renderNode(child, i))

  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{children}</p>

    case 'heading': {
      const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements
      return <Tag key={index}>{children}</Tag>
    }

    case 'list':
      if (block.format === 'ordered') return <ol key={index}>{children}</ol>
      return <ul key={index}>{children}</ul>

    case 'list-item':
      return <li key={index}>{children}</li>

    case 'link':
      return (
        <a key={index} href={block.url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )

    case 'quote':
      return <blockquote key={index}>{children}</blockquote>

    case 'code':
      return <pre key={index}><code>{children}</code></pre>

    default:
      return <div key={index}>{children}</div>
  }
}

interface Props {
  content: BlockNode[] | string | null | undefined
}

export default function BlocksRenderer({ content }: Props) {
  if (!content) return null

  // Si llega como string (Long Text), renderizar como texto plano con párrafos
  if (typeof content === 'string') {
    return (
      <>
        {content.split('\n').map((line, i) =>
          line.trim() ? <p key={i}>{line}</p> : <br key={i} />
        )}
      </>
    )
  }

  // Si llega como array de bloques (Rich Text Blocks)
  if (Array.isArray(content)) {
    return <>{content.map((node, i) => renderNode(node, i))}</>
  }

  return null
}
