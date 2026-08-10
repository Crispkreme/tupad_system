import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HouseholdMemberController::store
* @see app/Http/Controllers/HouseholdMemberController.php:12
* @route '/api/households/{household}/members'
*/
export const store = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/households/{household}/members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HouseholdMemberController::store
* @see app/Http/Controllers/HouseholdMemberController.php:12
* @route '/api/households/{household}/members'
*/
store.url = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{household}', parsedArgs.household.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdMemberController::store
* @see app/Http/Controllers/HouseholdMemberController.php:12
* @route '/api/households/{household}/members'
*/
store.post = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::store
* @see app/Http/Controllers/HouseholdMemberController.php:12
* @route '/api/households/{household}/members'
*/
const storeForm = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::store
* @see app/Http/Controllers/HouseholdMemberController.php:12
* @route '/api/households/{household}/members'
*/
storeForm.post = (args: { household: number | { id: number } } | [household: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\HouseholdMemberController::show
* @see app/Http/Controllers/HouseholdMemberController.php:45
* @route '/api/households/{household}/members/{member}'
*/
export const show = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/households/{household}/members/{member}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseholdMemberController::show
* @see app/Http/Controllers/HouseholdMemberController.php:45
* @route '/api/households/{household}/members/{member}'
*/
show.url = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            household: args[0],
            member: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        household: typeof args.household === 'object'
        ? args.household.id
        : args.household,
        member: typeof args.member === 'object'
        ? args.member.id
        : args.member,
    }

    return show.definition.url
            .replace('{household}', parsedArgs.household.toString())
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdMemberController::show
* @see app/Http/Controllers/HouseholdMemberController.php:45
* @route '/api/households/{household}/members/{member}'
*/
show.get = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::show
* @see app/Http/Controllers/HouseholdMemberController.php:45
* @route '/api/households/{household}/members/{member}'
*/
show.head = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::show
* @see app/Http/Controllers/HouseholdMemberController.php:45
* @route '/api/households/{household}/members/{member}'
*/
const showForm = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::show
* @see app/Http/Controllers/HouseholdMemberController.php:45
* @route '/api/households/{household}/members/{member}'
*/
showForm.get = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::show
* @see app/Http/Controllers/HouseholdMemberController.php:45
* @route '/api/households/{household}/members/{member}'
*/
showForm.head = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HouseholdMemberController::update
* @see app/Http/Controllers/HouseholdMemberController.php:62
* @route '/api/households/{household}/members/{member}'
*/
export const update = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/households/{household}/members/{member}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\HouseholdMemberController::update
* @see app/Http/Controllers/HouseholdMemberController.php:62
* @route '/api/households/{household}/members/{member}'
*/
update.url = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            household: args[0],
            member: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        household: typeof args.household === 'object'
        ? args.household.id
        : args.household,
        member: typeof args.member === 'object'
        ? args.member.id
        : args.member,
    }

    return update.definition.url
            .replace('{household}', parsedArgs.household.toString())
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdMemberController::update
* @see app/Http/Controllers/HouseholdMemberController.php:62
* @route '/api/households/{household}/members/{member}'
*/
update.put = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::update
* @see app/Http/Controllers/HouseholdMemberController.php:62
* @route '/api/households/{household}/members/{member}'
*/
const updateForm = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::update
* @see app/Http/Controllers/HouseholdMemberController.php:62
* @route '/api/households/{household}/members/{member}'
*/
updateForm.put = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\HouseholdMemberController::destroy
* @see app/Http/Controllers/HouseholdMemberController.php:100
* @route '/api/households/{household}/members/{member}'
*/
export const destroy = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/households/{household}/members/{member}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HouseholdMemberController::destroy
* @see app/Http/Controllers/HouseholdMemberController.php:100
* @route '/api/households/{household}/members/{member}'
*/
destroy.url = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            household: args[0],
            member: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        household: typeof args.household === 'object'
        ? args.household.id
        : args.household,
        member: typeof args.member === 'object'
        ? args.member.id
        : args.member,
    }

    return destroy.definition.url
            .replace('{household}', parsedArgs.household.toString())
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseholdMemberController::destroy
* @see app/Http/Controllers/HouseholdMemberController.php:100
* @route '/api/households/{household}/members/{member}'
*/
destroy.delete = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::destroy
* @see app/Http/Controllers/HouseholdMemberController.php:100
* @route '/api/households/{household}/members/{member}'
*/
const destroyForm = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HouseholdMemberController::destroy
* @see app/Http/Controllers/HouseholdMemberController.php:100
* @route '/api/households/{household}/members/{member}'
*/
destroyForm.delete = (args: { household: number | { id: number }, member: number | { id: number } } | [household: number | { id: number }, member: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const HouseholdMemberController = { store, show, update, destroy }

export default HouseholdMemberController