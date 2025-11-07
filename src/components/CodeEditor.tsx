import {useEffect, useRef} from 'react'
import {editor} from 'monaco-editor'
import {Editor, loader} from '@monaco-editor/react'
import {configureMonacoYaml} from 'monaco-yaml'

window.MonacoEnvironment = {
    getWorker(moduleId, label) {
        switch (label) {
            case 'editorWorkerService':
                return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), {
                    type: 'module'
                })
            case 'yaml':
                return new Worker(new URL('./yaml.worker.js', import.meta.url), {type: 'module'})
            default:
                throw new Error(`Unknown label ${label}`)
        }
    }
}

type CodeEditorProps = {
    value?: string
    language?: 'markdown' | 'yaml'
    // eslint-disable-next-line
    schemas?: any[]
}

export const CodeEditor = function ({
                                        value,
                                        language,
                                        schemas,
                                    }: CodeEditorProps) {
    loader.config({
        paths: {vs: '/monaco-editor/min/vs'},
    })
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

    useEffect(() => {
        loader.init().then((monacoInstance) => {
            switch (language) {
                case 'yaml':
                    if (schemas) {
                        console.debug('Configuring yaml schemas')
                        configureMonacoYaml(monacoInstance, {
                            validate: true,
                            enableSchemaRequest: false,
                            schemas: schemas?.map((s, i) => {
                                if (i === 0)
                                    return {
                                        uri: s['$id'],
                                        fileMatch: ['*'],
                                        schema: s,
                                    }
                                else
                                    return {
                                        uri: s['$id'],
                                        fileMatch: [],
                                        schema: s,
                                    }
                            }),
                        })
                    }
                    break
            }
        })
    }, [])

    return (
        <Editor
            height="100vh"
            language={language}
            value={value}
            onMount={(editor) => {
                editorRef.current = editor
            }}
            options={{
                fontFamily: 'monospace',
                fontLigatures: true,
                cursorBlinking: 'smooth',
                fixedOverflowWidgets: true,
                tabSize: 2,
                trimAutoWhitespace: true,
            }}
        />
    )
}
