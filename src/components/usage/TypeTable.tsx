import React from 'react';

export interface TypeTableRow {
    /** Prop name shown in the first column. Use `?` suffix for optional. */
    prop: string;
    /** TypeScript type string shown in the second column. */
    type: string;
    /** Default value, or `null`/`undefined` to render an em‑dash. */
    default?: string | null;
    /** Optional inline description rendered under the prop chip. */
    description?: string;
    /** Mark the prop as deprecated — chip gets line‑through styling. */
    deprecated?: boolean;
}

interface TypeTableProps {
    rows: TypeTableRow[];
    /** Show the Description column. Defaults to `true` if any row has one. */
    showDescription?: boolean;
    className?: string;
}

/**
 * Animate-ui style props/type table — rounded chrome, header row in a slightly
 * lighter shade, prop chips in the site accent (#6C5CE7) and neutral chips for
 * type/default values. Stays on the Reicon dark palette.
 */
export default function TypeTable({ rows, showDescription, className = '' }: TypeTableProps) {
    const hasDesc = rows.some((r) => !!r.description);
    const renderDesc = showDescription ?? hasDesc;

    return (
        <>
            <TypeTableStyles />
            <div className={`reicon-tt-wrap ${className}`}>
                <table className="reicon-tt">
                    <thead>
                        <tr>
                            <th style={{ width: renderDesc ? '30%' : '45%' }}>Prop</th>
                            <th style={{ width: '25%' }}>Type</th>
                            <th style={{ width: renderDesc ? '20%' : '30%' }}>Default</th>
                            {renderDesc && <th style={{ width: '25%' }}>Description</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.prop}>
                                <td>
                                    <div className="reicon-tt-field">
                                        <code
                                            className={`reicon-tt-chip reicon-tt-chip--prop${row.deprecated ? ' reicon-tt-chip--deprecated' : ''
                                                }`}
                                        >
                                            {row.prop}
                                        </code>
                                    </div>
                                </td>
                                <td>
                                    <code className="reicon-tt-chip">{row.type}</code>
                                </td>
                                <td>
                                    {row.default ? (
                                        <code className="reicon-tt-chip">{row.default}</code>
                                    ) : (
                                        <span className="reicon-tt-dash">—</span>
                                    )}
                                </td>
                                {renderDesc && (
                                    <td className="reicon-tt-desc">{row.description ?? ''}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

function TypeTableStyles() {
    return (
        <style>{`
      .reicon-tt-wrap {
        margin-block: 0;
        overflow: auto;
        border-radius: 12px;
        border: 1px solid var(--border-base);
        background: var(--surface-base);
      }

      .reicon-tt {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        white-space: nowrap;
        font-size: 13px;
        color: var(--text-muted);
      }

      /* Header */
      .reicon-tt thead th {
        text-align: start;
        padding: 0.625rem 1rem;
        background: var(--surface-hover);
        border-bottom: 1px solid var(--border-base);
        border-inline-start: 1px solid var(--border-base);
        font-weight: 600;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-more-muted);
      }
      .reicon-tt thead th:first-child { border-inline-start: none; }

      /* Body cells */
      .reicon-tt tbody td {
        text-align: start;
        padding: 0.625rem 1rem;
        border-inline-start: 1px solid var(--border-base);
        vertical-align: baseline;
      }
      .reicon-tt tbody td:first-child { border-inline-start: none; }

      /* Row separators */
      .reicon-tt tbody tr:not(:last-child) td {
        border-bottom: 1px solid var(--border-muted);
      }

      .reicon-tt tbody tr:hover td {
        background: var(--surface-hover);
      }

      /* Field cell content */
      .reicon-tt-field {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.375rem;
      }

      /* Code chips */
      .reicon-tt-chip {
        display: inline-block;
        border-radius: 6px;
        padding: 2px 7px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
        line-height: 1.55;
        background: var(--surface-hover);
        color: var(--text-hover);
        border: 1px solid var(--border-muted);
      }

      /* Prop chip — accent color, like fd-primary/10 + text-fd-primary */
      .reicon-tt-chip--prop {
        background: rgba(108, 92, 231, 0.14);
        color: #b3a8ff;
        border-color: rgba(108, 92, 231, 0.25);
      }

      .reicon-tt-chip--deprecated {
        text-decoration: line-through;
        color: rgba(179, 168, 255, 0.5);
      }

      .reicon-tt-dash {
        color: var(--text-more-muted);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
      }

      .reicon-tt-desc {
        color: var(--text-more-muted);
        white-space: normal;
        font-size: 12.5px;
      }

      /* Mobile — collapse description column visually but keep ergonomic widths */
      @media (max-width: 640px) {
        .reicon-tt {
          font-size: 12.5px;
        }
        .reicon-tt thead th,
        .reicon-tt tbody td {
          padding: 0.5rem 0.75rem;
        }
      }
    `}</style>
    );
}
