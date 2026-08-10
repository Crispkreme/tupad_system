import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HouseholdController::index
* @see app/Http/Controllers/HouseholdController.php:16
* @route '/api/households'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/households',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseholdController::index
* @see app/Http/Controllers/HouseholdController.php:16
* @route '/api/households'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdController::index
* @see app/Http/Controllers/HouseholdController.php:16
* @route '/api/households'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdController::index
* @see app/Http/Controllers/HouseholdController.php:16
* @route '/api/households'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HouseholdController::index
* @see app/Http/Controllers/HouseholdController.php:16
* @route '/api/households'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdController::index
* @see app/Http/Controllers/HouseholdController.php:16
* @route '/api/households'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdController::index
* @see app/Http/Controllers/HouseholdController.php:16
* @route '/api/households'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\HouseholdController::store
* @see app/Http/Controllers/HouseholdController.php:26
* @route '/api/households'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/households',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HouseholdController::store
* @see app/Http/Controllers/HouseholdController.php:26
* @route '/api/households'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdController::store
* @see app/Http/Controllers/HouseholdController.php:26
* @route '/api/households'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdController::store
* @see app/Http/Controllers/HouseholdController.php:26
* @route '/api/households'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdController::store
* @see app/Http/Controllers/HouseholdController.php:26
* @route '/api/households'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\HouseholdController::show
* @see app/Http/Controllers/HouseholdController.php:61
* @route '/api/households/{household}'
*/
export const show = (args: { household: string | number } | [household: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/households/{household}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseholdController::show
* @see app/Http/Controllers/HouseholdController.php:61
* @route '/api/households/{household}'
*/
show.url = (args: { household: string | number } | [household: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { household: args }
    }

    if (Array.isArray(args)) {
        args = {
            household: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        household: args.household,
    }

    return show.definition.url
            .replace('{household}', parsedArgs.household.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdController::show
* @see app/Http/Controllers/HouseholdController.php:61
* @route '/api/households/{household}'
*/
show.get = (args: { household: string | number } | [household: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdController::show
* @see app/Http/Controllers/HouseholdController.php:61
* @route '/api/households/{household}'
*/
show.head = (args: { household: string | number } | [household: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HouseholdController::show
* @see app/Http/Controllers/HouseholdController.php:61
* @route '/api/households/{household}'
*/
const showForm = (args: { household: string | number } | [household: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdController::show
* @see app/Http/Controllers/HouseholdController.php:61
* @route '/api/households/{household}'
*/
showForm.get = (args: { household: string | number } | [household: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdController::show
* @see app/Http/Controllers/HouseholdController.php:61
* @route '/api/households/{household}'
*/
showForm.head = (args: { household: string | number } | [household: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\HouseholdController::update
* @see app/Http/Controllers/HouseholdController.php:78
* @route '/api/households/{household}'
*/
export const update = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/households/{household}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\HouseholdController::update
* @see app/Http/Controllers/HouseholdController.php:78
* @route '/api/households/{household}'
*/
update.url = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { household: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { household: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            household: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        household: typeof args.household === 'object'
        ? args.household.id
        : args.household,
    }

    return update.definition.url
            .replace('{household}', parsedArgs.household.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdController::update
* @see app/Http/Controllers/HouseholdController.php:78
* @route '/api/households/{household}'
*/
update.put = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\HouseholdController::update
* @see app/Http/Controllers/HouseholdController.php:78
* @route '/api/households/{household}'
*/
update.patch = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\HouseholdController::update
* @see app/Http/Controllers/HouseholdController.php:78
* @route '/api/households/{household}'
*/
const updateForm = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdController::update
* @see app/Http/Controllers/HouseholdController.php:78
* @route '/api/households/{household}'
*/
updateForm.put = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdController::update
* @see app/Http/Controllers/HouseholdController.php:78
* @route '/api/households/{household}'
*/
updateForm.patch = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\HouseholdController::destroy
* @see app/Http/Controllers/HouseholdController.php:118
* @route '/api/households/{household}'
*/
export const destroy = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/households/{household}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HouseholdController::destroy
* @see app/Http/Controllers/HouseholdController.php:118
* @route '/api/households/{household}'
*/
destroy.url = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { household: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { household: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            household: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        household: typeof args.household === 'object'
        ? args.household.id
        : args.household,
    }

    return destroy.definition.url
            .replace('{household}', parsedArgs.household.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdController::destroy
* @see app/Http/Controllers/HouseholdController.php:118
* @route '/api/households/{household}'
*/
destroy.delete = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\HouseholdController::destroy
* @see app/Http/Controllers/HouseholdController.php:118
* @route '/api/households/{household}'
*/
const destroyForm = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdController::destroy
* @see app/Http/Controllers/HouseholdController.php:118
* @route '/api/households/{household}'
*/
destroyForm.delete = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const HouseholdController = { index, store, show, update, destroy }

export default HouseholdController