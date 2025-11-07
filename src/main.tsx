import {createRoot} from 'react-dom/client'
import {CodeEditor} from "./components/CodeEditor.tsx";

createRoot(document.getElementById('root')!).render(<>
        <h1>Monaco YAML Vite, React example</h1>
        <CodeEditor language="yaml" schemas={[{
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'The person’s display name'
                },
                age: {
                    type: 'integer',
                    description: 'How old is the person in years?'
                },
                occupation: {
                    enum: ['Delivery person', 'Software engineer', 'Astronaut']
                }
            }
        }]} value={'name: John Doe\nage: 42\noccupation: Pirate\n'}/>
    </>
)
